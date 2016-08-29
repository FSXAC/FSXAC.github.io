// rockets
var rockets;
var lifespan = 200;

// target
var targetx = width / 2;
var targety = 50;
var targetr = 20;
var target;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0)

  // create rocket objs
  rockets = new Rockets();

  // create new target
  target = new Target();
}

function draw() {
  background(0);

  // update rockets
  rockets.run();

  // reset if everyone is dead, reset
  if (rockets.allEnabled() == false) {
    rockets.printFitness(target);
    rockets = new Rockets();
  }

  // draw target
  target.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// group of rockets as a class
function Rockets() {
  this.rockets = [];
  this.population = 1;

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

  this.printFitness = function(target) {
    for (var i = 0; i < this.population; i++) {
      console.log(this.rockets[i].getFitness(target));
    }
  }
}

// rocket class
function Rocket(target) {
  // attributes
  this.position = createVector(width / 2, height - 20);
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector();
  this.dna = new DNA();

  // target
  this.target = target.position

  // measures how long it has lived
  this.life = 0;

  // alive when life < lifespan
  this.isAlive = true;

  // enabled when it hasnt crashed
  this.isEnabled = true;

  // enabled when it reaches target
  this.isAchieved = false;

  // fitness
  this.fitness = 0;
  this.bestfitness = this.fitness;

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

    // check fitness and best fitness
    this.fitness = 1 / dist(this.position.x, this.position.y, targetx, targety);
    if (this.fitness > this.bestfitness) {
      this.bestfitness = this.fitness;
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

  this.checkTarget = function() {
    // check the collision with the target
    if (dist(this.position.x, this.position.y, targetx, targety) <= targetr) {
      this.isEnabled = false;
      this.isAchieved = true;
    }
  }

  this.getFitness = function() {
    if (this.isAchieved) {
      // speed bonus
      this.bestfitness += lifespan - this.life;

      // target bonus
      this.bestfitness *= 1.5;
    }
    return this.bestfitness;
  }
}

// DNA class defines behavior of rockets
function DNA() {
  this.genes = [];
  for (var i = 0; i < lifespan; i++) {
    this.genes[i] = p5.Vector.random2D().setMag(0.5);
  }
}

function Target() {
  this.position = createVector(targetx, targety);
  this.radius = targetr;

  this.show = function() {
    noStroke();
    fill("#0F0");
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
  }
}
