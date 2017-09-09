// p5

var body;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  body = new Body();
  body.setPosition(width / 2, 50);
}

function draw() {
  background(255);
  fill(0);
  noStroke();
  ellipse(mouseX, mouseY, 20, 20);

  // TODO: WTFFFFFw
  body.applyForce(createVector(0, 0.0001));
  body.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function Body() {
  this.mass = 20;
  this.position = createVector(mouseX, mouseY);
  this.velocity = createVector(0, 0);
  this.acceleartion = createVector(0, 0);

  this.setMass = function(newMass) {
    this.mass = newMass;
  };

  this.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;
  };

  this.setVelocity = function(vx, vy) {
    this.velocity.x = vx;
    this.velocity.y = vy;
  };

  this.applyForce = function(force) {
    this.acceleation.add(force);
  };

  this.show = function() {
    ellispse(this.postion.x, this.position.y,
    this.mass, this.mass);

    this.update();
  };

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.position);

    // reset forces
    this.acceleration.mult(0);
  };

  // TODO: javascript is soooooo different
}
