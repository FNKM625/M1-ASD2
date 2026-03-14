let angle = 0;
let isDarkTheme = true;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent('canvas-container');

    const levelSlider = document.getElementById('levelSlider');
    levelSlider.oninput = () => document.getElementById('levelVal').innerText = levelSlider.value;

    const speedSlider = document.getElementById('speedSlider');
    speedSlider.oninput = () => document.getElementById('speedVal').innerText = speedSlider.value;

    document.getElementById('resetBtn').onclick = () => angle = 0;
    document.getElementById('bgToggleBtn').onclick = () => isDarkTheme = !isDarkTheme;
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

    const level = parseInt(document.getElementById('levelSlider').value);
    const speed = parseInt(document.getElementById('speedSlider').value) / 100;

    translate(width / 2, height / 2);
    rotate(angle);
    angle += speed;

    let len = 400;
    let h = len * Math.sqrt(3) / 2;
    let p1 = createVector(-len / 2, h / 3);
    let p2 = createVector(len / 2, h / 3);
    let p3 = createVector(0, -2 * h / 3);

    drawKochCurve(p1, p2, level);
    drawKochCurve(p2, p3, level);
    drawKochCurve(p3, p1, level);

    if (frameCount % 30 === 0) {
        document.getElementById('fpsVal').innerText = frameRate().toFixed(0);
        document.getElementById('lineCount').innerText = (3 * Math.pow(4, level)).toLocaleString();
        
        if(document.getElementById('speedVal')) {
            document.getElementById('speedVal').innerText = document.getElementById('speedSlider').value;
        }
    }
}

function drawKochCurve(a, b, level) {
    if (level === 0) {
        line(a.x, a.y, b.x, b.y);
    } else {
        let v = p5.Vector.sub(b, a);
        v.div(3);

        let p1 = p5.Vector.add(a, v); // 1/3 długości
        let p3 = p5.Vector.sub(b, v); // 2/3 długości

        v.rotate(PI / 3);
        let p2 = p5.Vector.add(p1, v);

        drawKochCurve(a, p1, level - 1);
        drawKochCurve(p1, p2, level - 1);
        drawKochCurve(p2, p3, level - 1);
        drawKochCurve(p3, b, level - 1);
    }
}