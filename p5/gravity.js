// p5
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
}

function draw() {
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function Body() {
  this.mass;
  this.position = createVector();
  this.velocity = createVector();
  this.acceleartion = createVector();

  this.setMass = function(newMass) {
    this.mass = newMass;
  }

  this.setPosition = function(x, y) {
    this.position = createVector(x, y);
  }

  // TODO: javascript is soooooo different
}
