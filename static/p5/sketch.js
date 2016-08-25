// p5
var range = 100;
var variation = 10;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
}

function mouseMoved() {
  stroke('rgba(20, 20, 50, 0.1)');
  line(mouseX + random(-variation, variation),
   mouseY + random(-variation, variation),
   mouseX + random(-range, range),
   mouseY + random(-range, range));
}
