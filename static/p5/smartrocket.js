var rockets;
var lifespan = 200;

// target
var target;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // create rocket objs
  rockets = new Rockets();

  // create new target
  target = createVector(width / 2, 50);
}

function draw() {
  background(0);

  // update rockets
  rockets.run();

  // reset if everyone is dead, reset
  if (rockets.allEnabled() == false) {
    rockets = new Rockets();
  }

  // draw target
  noStroke();
  fill("#0F0");
  ellipse(target.x, target.y, 20, 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// group of rockets as a class
function Rockets() {
  this.rockets = [];
  this.population = 50;

  for (var i = 0; i < this.population; i++) {
    this.rockets[i] = new Rocket();
  }

  this.run = function() {
    for (var i = 0; i < this.population; i++) {
      this.rockets[i].applyForce(createVector(0, 0.05))
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }

  this.allEnabled = function() {
    var isEnabled = false;
    for (var i = 0; i < this.population; i++) {
      if (this.rockets[i].isEnabled == true) {
        isEnabled = true;
        break;
      }
    }
    return isEnabled;
  }
}

// rocket class
function Rocket() {
  // attributes
  this.position = createVector(width / 2, height - 20);
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector();
  this.dna = new DNA();

  // measures how long it has lived
  this.life = 0;

  // alive when life < lifespan
  this.isAlive = true;

  // enabled when it hasnt crashed
  this.isEnabled = true;

  // methods
  this.applyForce = function(force) {
    this.acceleration.add(force);
  }
  this.update = function() {
    // add dna to acceleration
    this.applyForce(this.dna.genes[this.life]);
    this.life++;

    if (this.life >= lifespan) {
      this.isAlive = false;
    }

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    // check collision only when still enabled
    if (this.isEnabled) {
      this.checkCollision();
    }
  }
  this.show = function() {
    push()
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    noStroke();

    if (this.isAlive) {
      fill("#0F0");
    } else {
      fill(150);
    }

    rectMode(CENTER);

    if (this.isEnabled) {
      rect(0, 0, 20, 10);
    }

    pop();
  }

  this.checkCollision = function() {
    // checks the collision on the side
    if (this.position.x >= width || this.position.x <= 0 ||
    this.position.y >= height || this.position.y <= 0) {
      this.isEnabled = false;
    }
  }
}

// DNA class defines behavior of rockets
function DNA() {
  this.genes = [];
  for (var i = 0; i < lifespan; i++) {
    this.genes[i] = p5.Vector.random2D().setMag(0.5);
  }
}
