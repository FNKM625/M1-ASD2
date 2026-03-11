let angle = 0;

function setup() {
    // Tworzymy canvas i przypisujemy go do kontenera z nowego stylu
    let canvas = createCanvas(800, 500);
    canvas.parent('canvas-container');

    // Inicjalizacja UI zgodnie z wymaganiami [cite: 38]
    const levelSlider = document.getElementById('levelSlider');
    levelSlider.oninput = () => document.getElementById('levelVal').innerText = levelSlider.value;

    document.getElementById('resetBtn').onclick = () => angle = 0;
}

function draw() {
    background(30);
    stroke(0, 200, 255);
    noFill();

    const level = parseInt(document.getElementById('levelSlider').value);
    const speed = parseInt(document.getElementById('speedSlider').value) / 1000;

    // Centrowanie i animacja obrotu [cite: 33, 34]
    translate(width / 2, height / 2);
    rotate(angle);
    angle += speed;

    // Definiujemy wierzchołki trójkąta równobocznego (baza płatka)
    let len = 400;
    let h = len * Math.sqrt(3) / 2;
    let p1 = createVector(-len / 2, h / 3);
    let p2 = createVector(len / 2, h / 3);
    let p3 = createVector(0, -2 * h / 3);

    // Rysowanie trzech boków płatka Kocha [cite: 19, 22]
    drawKochCurve(p1, p2, level);
    drawKochCurve(p2, p3, level);
    drawKochCurve(p3, p1, level);

    // Aktualizacja licznika FPS
    document.getElementById('fpsVal').innerText = frameRate().toFixed(0);
    document.getElementById('lineCount').innerText = (3 * Math.pow(4, level)).toLocaleString();
}

// Rekurencyjna funkcja generująca strukturę [cite: 22, 51, 80]
function drawKochCurve(a, b, level) {
    if (level === 0) {
        line(a.x, a.y, b.x, b.y);
    } else {
        // Obliczanie punktów podziału boku (matematyka fraktala) 
        let v = p5.Vector.sub(b, a);
        v.div(3);

        let p1 = p5.Vector.add(a, v); // 1/3 długości
        let p3 = p5.Vector.sub(b, v); // 2/3 długości

        // Punkt szczytowy trójkąta (obrót o 60 stopni)
        v.rotate(PI / 3);
        let p2 = p5.Vector.add(p1, v);

        // Rekurencyjne wywołanie dla nowych 4 segmentów
        drawKochCurve(a, p1, level - 1);
        drawKochCurve(p1, p2, level - 1);
        drawKochCurve(p2, p3, level - 1);
        drawKochCurve(p3, b, level - 1);
    }
}