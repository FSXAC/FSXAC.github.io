// p5
var range = 50;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.class("pcanvas");
}

function mouseMoved() {
  stroke('rgba(1, 15, 29, 0.1)');
  line(mouseX, mouseY,
   mouseX + random(-range, range),
   mouseY + random(-range, range));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
