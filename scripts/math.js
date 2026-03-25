// math.js
function drawKoch(level, drawType) {
    translate(width / 2, height / 2);
    if (drawType === 1) {
        const speed = parseFloat(speedSlider.value) / 1000;
        rotate(angle);
        angle += speed;
        drawKochFull(level);
    } else {
        let p1 = createVector(-300, 50);
        let p2 = createVector(300, 50);
        drawKochStatic(p1, p2, currentLevel);
    }
}

function drawKochFull(level) {
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
        let [p1, p2, p3] = calculatePoints(a, b, 1);

        drawKochCurve(a, p1, level - 1);
        drawKochCurve(p1, p2, level - 1);
        drawKochCurve(p2, p3, level - 1);
        drawKochCurve(p3, b, level - 1);
    }
}

function drawKochStatic(a, b, level) {
    if (level === 0) {
        if (!isStepAnimating) {
            line(a.x, a.y, b.x, b.y);
            return;
        }
    }

    let [p1, p2, p3] = calculatePoints(a, b, -1);

    if (level === 0 && isStepAnimating) {
        let c = isDarkTheme ? color(0, 200, 255) : color(0, 50, 150);
        
        stroke(c);
        line(a.x, a.y, p1.x, p1.y);
        line(p3.x, p3.y, b.x, b.y);

        if (kochAnimationStep === 1) {
            let alphaFade = map(animProgress, 0, 1, 255, 0, true);
            stroke(red(c), green(c), blue(c), alphaFade);
            line(p1.x, p1.y, p3.x, p3.y);
        } else if (kochAnimationStep === 2) {
            let alphaShow = map(animProgress, 0, 1, 0, 255, true);
            stroke(red(c), green(c), blue(c), alphaShow);
            line(p1.x, p1.y, p2.x, p2.y);
            line(p2.x, p2.y, p3.x, p3.y);
        }
    } else if (level > 0) {
        drawKochStatic(a, p1, level - 1);
        drawKochStatic(p1, p2, level - 1);
        drawKochStatic(p2, p3, level - 1);
        drawKochStatic(p3, b, level - 1);
    }
}

function calculatePoints(a, b, modifier) {
    let v = p5.Vector.sub(b, a);
    v.div(3);
    let p1 = p5.Vector.add(a, v);
    let p3 = p5.Vector.sub(b, v);
    v.rotate(modifier * PI / 3);
    let p2 = p5.Vector.add(p1, v);

    return [p1, p2, p3];
}