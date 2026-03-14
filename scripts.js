// Deklaracje zmiennych globalnych
let angle = 0;
let isDarkTheme = true;
let drawType = 2;

// Elementy DOM (pobierane globalnie, ale używane po załadowaniu)
let resetBtn, bgToggleBtn, startStopBtn, drawModeBtn;
let levelSlider, speedSlider, speedVal, fpsVal, lineCount;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent('canvas-container');

    // Inicjalizacja elementów DOM
    resetBtn = document.getElementById('resetBtn');
    bgToggleBtn = document.getElementById('bgToggleBtn');
    startStopBtn = document.getElementById('startStopBtn');
    drawModeBtn = document.getElementById('drawModeBtn');
    levelSlider = document.getElementById('levelSlider');
    speedSlider = document.getElementById('speedSlider');
    speedVal = document.getElementById('speedVal');
    fpsVal = document.getElementById('fpsVal');
    lineCount = document.getElementById('lineCount');

    // Obsługa zdarzeń (Interakcja - Punkt 2.4) [cite: 38, 40]
    resetBtn.onclick = () => angle = 0;
    bgToggleBtn.onclick = () => isDarkTheme = !isDarkTheme;
    startStopBtn.onclick = startStopAnimation;
    drawModeBtn.onclick = toggleDrawMode;

    // Aktualizacja etykiet suwaków
    levelSlider.oninput = () => document.getElementById('levelVal').innerText = levelSlider.value;
    speedVal.innerText = (speedSlider.value / 10).toFixed(1);
    speedSlider.oninput = () => speedVal.innerText = (speedSlider.value / 10).toFixed(1);
}

function draw() {
    if (isDarkTheme) {
        background(30);
        stroke(0, 200, 255);
    } else {
        background(245);
        stroke(0, 50, 150);
    }
    noFill();

    const level = parseInt(levelSlider.value);

    if (drawType === 1) {
        poruszanie(level);
    } else if (drawType === 2) {
        statycznyPlatek(level);
    }

    if (frameCount % 30 === 0) {
        fpsVal.innerText = frameRate().toFixed(0);
        let count = (drawType === 1) ? 3 * Math.pow(4, level) : Math.pow(4, level);
        lineCount.innerText = count.toLocaleString();
    }
}

function poruszanie(level) {
    const speed = parseFloat(speedSlider.value) / 1000;

    translate(width / 2, height / 2);
    rotate(angle);
    angle += speed;

    rysujPelnyPlatek(level);
}

function statycznyPlatek(level) {
    translate(width / 2, height / 2);
    
    let p1 = createVector(-300, 50);
    let p2 = createVector(300, 50);
    
    drawKochCurve(p2, p1, level);
}

function rysujPelnyPlatek(level) {
    let len = 400;
    let h = len * Math.sqrt(3) / 2;
    let p1 = createVector(-len / 2, h / 3);
    let p2 = createVector(len / 2, h / 3);
    let p3 = createVector(0, -2 * h / 3);

    drawKochCurve(p1, p2, level);
    drawKochCurve(p2, p3, level);
    drawKochCurve(p3, p1, level);
}

function drawKochCurve(a, b, level) {
    if (level === 0) {
        line(a.x, a.y, b.x, b.y);
    } else {
        let v = p5.Vector.sub(b, a);
        v.div(3);

        let p1 = p5.Vector.add(a, v);
        let p3 = p5.Vector.sub(b, v);

        v.rotate(PI / 3);
        let p2 = p5.Vector.add(p1, v);

        drawKochCurve(a, p1, level - 1);
        drawKochCurve(p1, p2, level - 1);
        drawKochCurve(p2, p3, level - 1);
        drawKochCurve(p3, b, level - 1);
    }
}

function startStopAnimation() {
    if (isLooping()) {
        noLoop();
        startStopBtn.innerText = 'Start';
    } else {
        loop();
        startStopBtn.innerText = 'Stop';
    }
}

function toggleDrawMode() {
    drawType = (drawType === 1) ? 2 : 1;
    drawModeBtn.innerText = (drawType === 1) ? 'Tryb: Obrót' : 'Tryb: Statyczny';
}