var gridSize = 20;

function setup() {
    // canvas = createCanvas(windowWidth, 100);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class("pcanvas");
    // canvas.parent('canvasContainer');
}

function draw() {
    // background(230);

    // draw dots
    stroke(200);
    for (var x = 0; x < width/gridSize; x++) {
        for (var y = 0; y < height/gridSize; y++) {
            point(x * gridSize, y * gridSize);
        }
    }
}

function mousePressed() {
    drawChip(mouseX, mouseY, randomInt(10), randomInt(10), "");
} 

function windowResized() {
    resizeCanvas(windowWidth, 100);
}

function snap(n) {
    return (gridSize * round(n / gridSize));
}

function randomInt(n) {
    return floor(random(n));
}

function drawChip(posX, posY, hPins, vPins, partName) {
    var w, h;

    // console.log(hPins, vPins);

    // if no pins
    if (hPins == 0 && vPins == 0) {
        h = w = gridSize / 2;
        rect(snap(posX) - w/2, snap(posY) - h/2, w, h);
    } else {
        w = (hPins == 0) ? 10 : gridSize * hPins;
        h = (vPins == 0) ? 10 : gridSize * vPins;
        rect(snap(posX) - (gridSize / 2), snap(posY) - (gridSize / 2), w, h);

        // w = (hPins == 0) ? gridSize / 2 : gridSize * hPins;
        // h = (vPins == 0) ? gridSize / 2 : gridSize * vPins;
        console.log(w, h);
        // rect(snap(posX) - (gridSize / (hPins == 0) ? 4 : 2), snap(posY) - (gridSize / (vPins == 0) ? 4 : 2), w, h);
    }
}