// rockets
var rocketGroup;
var lifespan = 300;

// gene pool
var pool = [];

// mutation probability (%)
var mutation = 10;

// target
var target;
var tradius = 10;

// movement rate
var movement = 2;

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
      for (var j = 0; j < parseInt(rocketGroup.rockets[i].getFitness()/fitnessSum*100); j++) {
        pool.push(rocketGroup.rockets[i].dna);
      }
    }

    // randomly select two for breeding
    var parentA = random(pool);
    var parentB = random(pool);

    // use two parents to breed
    rocketGroup.breed(parentA, parentB);

    // reset rockets
    rocketGroup = new Rockets();
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

// group of rockets as a class
function Rockets() {
  this.rockets = [];
  this.population = 50;

  for (var i = 0; i < this.population; i++) {
    this.rockets[i] = new Rocket();
  }

  this.run = function() {
    for (var i = 0; i < this.population; i++) {
      // gravity force
      this.rockets[i].applyForce(createVector(0, 0.05));

      // rocket update
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }

  this.breed = function(a, b) {
    for (var i = 0; i < this.population; i++) {
      this.rockets[i] = new Rocket(this.selectGenes(a, b));
    }
  }

  this.selectGenes = function(a, b) {
    var newGenes = [];
    var slice = floor(random(a.genes.length));
    for (var i = 0; i < a.genes.length; i++) {
      // var whichParent = random(['A', 'B']);
      // var hasMutation = random(0, 100);
      //
      // if (hasMutation <= mutation) {
      //   newDNA.genes[i] = p5.Vector.random2D().setMag(movement);
      // } else {
      //   if (whichParent == 'A') {
      //     // choose genes from parent A
      //     newDNA.genes[i] = createVector(a.genes[i].x, a.genes[i].y);
      //   } else {
      //     // choose genes from parent B
      //     newDNA.genes[i] = createVector(b.genes[i].x, b.genes[i].y);
      //   }
      // }

      // new breeding
      if (i < slice) {
        // take from a
        newGenes[i] = a.genes[i];
      } else {
        // take from b
        newGenes[i] = b.genes[i];
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
      this.checkTarget();
    }

    // check fitness and best fitness
    this.dist = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = 1 / this.dist;
    // this.fitness = map(1 / (10 * this.dist * this.dist), 0, 1, 0, 100);
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
