var rockets;
var lifespan = 400;

// target
var target;

function setup() {
  canvas = createCanvas(800, 800);

  // create rocket objs
  rockets = new Rockets();

  // create new target
  target = createVector(width / 2, 50);
}

function draw() {
  background(0);

  // update rockets
  rockets.run();

  // draw target
  noStroke();
  fill("#0F0");
  ellipse(target.x, target.y, 20, 20);
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
      this.rockets[i].update();
      this.rockets[i].show();
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

// rocket class
function Rocket() {
  // attributes
  this.position = createVector(width / 2, height/2);
  // this.velocity = createVector();
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector();
  this.dna = new DNA();

  // measures how long it has lived
  this.life = 0;

  // methods
  this.applyForce = function(force) {
    this.acceleration.add(force);
  }
  this.update = function() {
    // add dna to acceleration
    this.applyForce(this.dna.genes[this.life]);
    this.life++;

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  this.show = function() {
    push()
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    noStroke();
    fill(255, 200);
    rectMode(CENTER);
    rect(0, 0, 20, 10);
    pop();
  }
}
