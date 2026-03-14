// ui.js
function initUI() {
    resetBtn = document.getElementById('resetBtn');
    bgToggleBtn = document.getElementById('bgToggleBtn');
    startStopBtn = document.getElementById('startStopBtn');
    drawModeBtn = document.getElementById('drawModeBtn');
    levelSlider = document.getElementById('levelSlider');
    speedSlider = document.getElementById('speedSlider');
    speedVal = document.getElementById('speedVal');
    fpsVal = document.getElementById('fpsVal');
    lineCount = document.getElementById('lineCount');
    rotationGroup = document.getElementById('rotationGroup');
    animateLineBtn = document.getElementById('animateLineBtn');

    resetBtn.onclick = () => angle = 0;
    bgToggleBtn.onclick = () => isDarkTheme = !isDarkTheme;
    startStopBtn.onclick = startStopFunc;
    drawModeBtn.onclick = drawModeFunc;
    animateLineBtn.onclick = animateLineFunc;

    levelSlider.oninput = () => document.getElementById('levelVal').innerText = levelSlider.value;
}

function startStopFunc() {
    if (isLooping()){
        noLoop();
        startStopBtn.innerText = 'Start';
    }
    else {
        loop();
        startStopBtn.innerText = 'Stop';
    }
}

function drawModeFunc() {
    drawType = (drawType === 1) ? 2 : 1;
    let isRotation = (drawType === 1);
    drawModeBtn.innerText = isRotation ? 'Tryb: Obrót (Płatek)' : 'Tryb: Statyczny (Linia)';

    [rotationGroup, resetBtn, startStopBtn].forEach(el => {
        if (el) el.classList.toggle('hidden', !isRotation);
    });

    [animateLineBtn].forEach(el => {
        if (el) el.classList.toggle('hidden', isRotation);
    });
}

function animateLineFunc() {
    targetLevel = parseInt(levelSlider.value);

    if (!isStepAnimating) {
        if (targetLevel > currentLevel) {
            isStepAnimating = true;
            kochAnimationStep = 1;
            animProgress = 0;

            animateLineBtn.classList.add('animating');
            animateLineBtn.innerText = 'Rysowanie...';
        } else if (targetLevel < currentLevel) {
            currentLevel = targetLevel;
            kochAnimationStep = 0;
            animProgress = 0;
        }
    }
}