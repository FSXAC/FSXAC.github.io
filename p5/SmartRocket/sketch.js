// rockets
var rocketGroup;
var lifespan = 50;
var population = 100;

// gene pool
var pool = [];

// mutation probability (%)
var mutation = 2;

// target
var target;
var tradius = 10;

// movement rate
var movement = 1;
var gravity = 0.05;

// show id
var showID = true;

// TODO: select parent -> modify genes -> child

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  // create rocket objs
  rocketGroup = new Rockets();

  // create new target
  target = createVector(width / 2, 50);
}

function draw() {
  background(0);

  // update rockets
  rocketGroup.run();

  // reset if everyone is dead, reset
  if (rocketGroup.allEnabled() == false) {
    pool = [];

    // create parent / gene pool
    var fitnessSum = rocketGroup.getFitnessSum();
    console.log(fitnessSum + '\t');
    for (var i = 0; i < rocketGroup.population; i++) {
      var tickets = parseInt(rocketGroup.rockets[i].getFitness()/fitnessSum*100);
      for (var j = 0; j < tickets; j++) {
        pool.push(rocketGroup.rockets[i].dna);
      }
    }

    // randomly select two for breeding
    var parentA = random(pool);
    var parentB = random(pool);

    // use two parents to breed
    rocketGroup.breed(parentA, parentB);
  }

  // draw target
  noStroke();
  fill("#0F0");
  ellipse(target.x, target.y, tradius * 2, tradius * 2);
}

// resize window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// reposition the target
function mousePressed() {
  target = createVector(mouseX, mouseY);
}

// group of rockets as a class
function Rockets() {
  this.rockets = [];
  this.population = population;

  for (var i = 0; i < this.population; i++) {
    this.rockets[i] = new Rocket();
    this.rockets[i].setId(i);
  }

  this.run = function() {
    for (var i = 0; i < this.population; i++) {
      // gravity force
      this.rockets[i].applyForce(createVector(0, gravity));

      // rocket update
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }

  this.breed = function(a, b) {
    for (var i = 0; i < this.population; i++) {
      this.rockets[i] = new Rocket(this.selectGenes(a, b));
      this.rockets[i].setId(i);
    }
  }

  this.selectGenes = function(a, b) {
    var newGenes = [];
    var slice = floor(random(a.genes.length));
    for (var i = 0; i < a.genes.length; i++) {
      // get chance for mutations
      var randomvalue = random(100);

      if (randomvalue < mutation) {
        newGenes[i] = p5.Vector.random2D();
      } else {
        // new breeding
        if (i < slice) {
          // take from a
          newGenes[i] = a.genes[i];
        } else {
          // take from b
          newGenes[i] = b.genes[i];
        }
      }
    }

    return newGenes;
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

  this.getFitnessSum = function() {
    var allFitness = 0;
    for (var i = 0; i < this.population; i++) {
      allFitness += this.rockets[i].getFitness();
    }

    return allFitness;
  }
}

// rocket class
function Rocket(genes) {
  // attributes
  this.position = createVector(width / 2, height - 20);
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector();

  // make new dna
  this.dna = new DNA(genes);

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
  this.bestfitness = 0;

  this.rocketID = 1;
  this.setId = function(newID) {
    this.rocketID = newID;
  }

  // methods
  this.applyForce = function(force) {
    this.acceleration.add(force);
  }
  this.update = function() {
    // only update if the rocket is still enabled
    if (this.isEnabled) {
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
        this.checkTarget();
      }

      // check fitness and best fitness
      this.dist = sq(dist(this.position.x, this.position.y, target.x, target.y));
      this.fitness = 1/this.dist;
      // this.fitness = 100 * exp(-0.000003 * this.dist);
      // this.fitness = map(1 / (10 * this.dist * this.dist), 0, 1, 0, 100);

      if (this.fitness > this.bestfitness) {
        this.bestfitness = this.fitness;
      }
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

    // show id
    if (showID) {
      textSize(15);
      text(this.rocketID, this.position.x, this.position.y - 15);
    }
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
    if (dist(this.position.x, this.position.y, target.x, target.y) <= tradius) {
      this.isEnabled = false;
      this.isAchieved = true;
    }
  }

  this.getFitness = function() {
    // bonus for achieving
    if (this.isAchieved) {
      // speed bonus
      this.bestfitness += lifespan - this.life;

      // target bonus
      this.bestfitness *= 1.5;
    }

    // short life penalty
    // TODO: maximum distance: 1500 px
    if (this.life < lifespan * 0.3) {
      this.bestfitness = 0.0000001
    }

    return this.bestfitness;
  }
}

// DNA class defines behavior of rockets
function DNA(genes) {
  this.genes = [];

  if (genes !== undefined) {
    for (var i = 0; i < genes.length; i++) {
      this.genes[i] = genes[i];
    }
  } else {
    for (var i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D().setMag(movement);
    }
  }
}
