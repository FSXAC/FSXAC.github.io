// p5
var dia = 10;
var rate = 1;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.id('sketch-container');

  noStroke();
}

function draw() {
  if (dia > 255 || dia < 0) {
    rate*=-1;
  }

  dia+=rate;
  fill(255 - dia);
  diameter = map(dia, 0, 255, 20, 150)
  ellipse(mouseX, mouseY, diameter, diameter);
}
