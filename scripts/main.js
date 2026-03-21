// main.js
let angle = 0;
let isDarkTheme = true;
let drawType = 1;

let resetBtn, bgToggleBtn, startStopBtn, drawModeBtn;
let levelSlider, speedSlider, speedVal, fpsVal, lineCount;
let rotationGroup, drawLevel;

let isStepAnimating = false;
let kochAnimationStep = 0;
let animProgress = 0;
let currentLevel = 1;
let targetLevel = 1;
let lineReload = false;


function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent('canvas-container');
    initUI();
}

function draw() {
    isDarkTheme ? background(30) : background(245);
    stroke(isDarkTheme ? color(0, 200, 255) : color(0, 50, 150));
    noFill();

    const level = parseInt(levelSlider.value);
    if (isStepAnimating) {
        animProgress += 0.015;
    
        if (animProgress >= 1) {
            if (kochAnimationStep === 1) {
                kochAnimationStep = 2;
                animProgress = 0;
            } else if (kochAnimationStep === 2) {
                currentLevel++;
            
                if (currentLevel < targetLevel) {
                    kochAnimationStep = 1;
                    animProgress = 0;
                } else {
                    isStepAnimating = false;
                    kochAnimationStep = 0;

                    animateLineBtn.classList.remove('animating');
                    animateLineBtn.innerText = 'Animuj krok';
                }
            }
        }
    }
    
    drawKoch(level, drawType);

    if (frameCount % 30 === 0) {
        fpsVal.innerText = frameRate().toFixed(0);
        let side = (drawType === 1) ? 3 : 1;
        
        if (drawType === 2 && !isStepAnimating) {
            if (lineReload) {
                lineReload = false;
            } else return;
        }
        else lineReload = false;
        let count = side * Math.pow(4, level);
        
        lineCount.innerText = count.toLocaleString();
    }
}

