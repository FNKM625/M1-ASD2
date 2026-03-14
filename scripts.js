// Deklaracje zmiennych globalnych
let angle = 0;
let isDarkTheme = true;
let drawType = 2;

let kochAnimationStep = 0; // 0: Start, 1: Fade, 2: Triangle, 3: End
let animationStartTime = 0;
const animationDuration = 60;

// Elementy DOM (pobierane globalnie, ale używane po załadowaniu)
let resetBtn, bgToggleBtn, startStopBtn, drawModeBtn;
let levelSlider, speedSlider, speedVal, fpsVal, lineCount;
let speedControlGroup;

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
    speedControlGroup = document.getElementById('speedControlGroup');

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
    // Motyw kolorystyczny
    if (isDarkTheme) {
        background(30);
        stroke(0, 200, 255);
    } else {
        background(245);
        stroke(0, 50, 150);
    }
    noFill();

    const level = parseInt(levelSlider.value);

    // Wybór trybu rysowania
    if (drawType === 1) {
        poruszanie(level);
    } else if (drawType === 2) {
        statycznyPlatek(); // Teraz bez parametru level
    }

    // Metryki wydajności odświeżane co 30 klatek
    if (frameCount % 30 === 0) {
        fpsVal.innerText = frameRate().toFixed(0);
        
        // Obliczanie liczby segmentów: Płatek vs Linia (zaokrąglamy dla metryki)
        let count = (drawType === 1) ? 3 * Math.pow(4, level) : 1; 
        if (kochAnimationStep >= 2) count = 4;
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

function statycznyPlatek() {
    translate(width / 2, height / 2);
    
    // Definiujemy punkty dla pojedynczej, wyśrodkowanej linii
    let p1 = createVector(-300, 50);
    let p2 = createVector(300, 50);
    
    // Obliczamy punkty podziału i szczyt
    let v = p5.Vector.sub(p2, p1);
    v.div(3);
    let p1_podzial = p5.Vector.add(p1, v);
    let p3_podzial = p5.Vector.sub(p2, v);
    v.rotate(-PI / 3); 
    let p2_szczyt = p5.Vector.add(p1_podzial, v);

    // Zawsze rysujemy dwa końcowe odcinki (one nie znikają)
    line(p1.x, p1.y, p1_podzial.x, p1_podzial.y);
    line(p3_podzial.x, p3_podzial.y, p2.x, p2.y);

    // Logika animacji
    let elapsed = frameCount - animationStartTime;

    if (kochAnimationStep === 1) { // Etap Fading (Zniknie)
        let alpha = map(elapsed, 0, animationDuration, 255, 0);
        stroke(red(strokeColor()), green(strokeColor()), blue(strokeColor()), alpha);
        line(p1_podzial.x, p1_podzial.y, p3_podzial.x, p3_podzial.y);

        if (elapsed >= animationDuration) {
            kochAnimationStep = 2;
            animationStartTime = frameCount;
        }
    } else if (kochAnimationStep === 2) { // Etap Triangle (Pojawi się)
        let alpha = map(elapsed, 0, animationDuration, 0, 255);
        stroke(red(strokeColor()), green(strokeColor()), blue(strokeColor()), alpha);
        line(p1_podzial.x, p1_podzial.y, p2_szczyt.x, p2_szczyt.y);
        line(p2_szczyt.x, p2_szczyt.y, p3_podzial.x, p3_podzial.y);

        if (elapsed >= animationDuration) {
            kochAnimationStep = 3;
        }
    } else if (kochAnimationStep === 3) { // Etap End (Koniec)
        // Rysujemy trójkąt z pełną widocznością
        line(p1_podzial.x, p1_podzial.y, p2_szczyt.x, p2_szczyt.y);
        line(p2_szczyt.x, p2_szczyt.y, p3_podzial.x, p3_podzial.y);
    } else { // Stan Startu
        // Rysujemy pełną linię
        line(p1_podzial.x, p1_podzial.y, p3_podzial.x, p3_podzial.y);
    }
    
    // Resetujemy kolor, aby nie wpływać na metryki
    stroke(strokeColor());
}

function strokeColor() {
    return isDarkTheme ? color(0, 200, 255) : color(0, 50, 150);
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
    if (drawType === 1) {
        drawModeBtn.innerText = 'Tryb: Obrót (Płatek)';
        speedControlGroup.classList.remove('hidden');
        resetBtn.classList.remove('hidden');
        startStopBtn.classList.remove('hidden');
    } else {
        drawModeBtn.innerText = 'Tryb: Statyczny (Linia)';
        speedControlGroup.classList.add('hidden');
        resetBtn.classList.add('hidden');
        startStopBtn.classList.add('hidden');
    }
}