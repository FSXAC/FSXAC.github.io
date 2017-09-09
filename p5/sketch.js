// p5
var range = 100;
var variation = 10;

function setup() {
        canvas = createCanvas(windowWidth, windowHeight);
        canvas.position(0, 0);
        canvas.class("pcanvas");
}

function mouseMoved() {
        stroke('rgba(0, 0, 0, 0.6)');
        line(mouseX + random(-variation, variation),
                        mouseY + random(-variation, variation),
                        mouseX + random(-range, range),
                        mouseY + random(-range, range));
}

function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
}
