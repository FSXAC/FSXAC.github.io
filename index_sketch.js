var particles = [];

var PARTICLES = 200;
var MOVEMENT_MIN = 30;
var MOVEMENT_MAX = 50;
var MOVEMENT_TARGET_SIZE = 1;
var MOVEMENT_LERP_RATE = 0.05;

var MOUSE_RANGE = 150;
var POINT_DARK = 220;
var POINT_LIGHT = 255;
var POINT_MIN = 3;
var POINT_MAX = 8;

var LINE_WIDTH_MIN = 0.2;
var LINE_WIDTH_MAX = 1;
var LINE_LIMIT_PER_POINT = 3;
var LINE_RANGE = 120;
var LINE_NEIGHBOUR_EFFECT = 0.5;
var LINE_DARK = 220;
var LINE_LIGHT = 255;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.class("pcanvas");
    canvas.position(0, 0);

    for (var i = 0; i < PARTICLES; i++) {
        particles[i] = new Particle(createVector(randInt(width), randInt(height)));
    }
}

function draw() {
    background(255);
    for (var i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
    }
}

// =========[ UTILITY FUNCTIONS ]=========
function randInt(n) {
    return round(random(n));
}

function randRange(n1, n2) {
    return randInt(n2 - n1) + n1;
}

function insideCanvas(x, y) {
    return (x > 0 && x < width) && (y > 0 && y < height);
}

// =========[ PARTICLE CLASS ]=========
function Particle(startingPos) {
    this.pos = startingPos;
    this.targetPos;
    this.size = random(POINT_MIN, POINT_MAX);
    
    
    this.nextTarget = function() {
        do {
            var randomMag = random(MOVEMENT_MIN, MOVEMENT_MAX);
            var randomDirection = p5.Vector.random2D();
            randomDirection.mult(randomMag);
            this.targetPos = p5.Vector.add(this.pos, randomDirection);
        } while (!insideCanvas(this.targetPos.x, this.targetPos.y));
    }

    this.nextTarget();

    this.draw = function() {
        var distanceToMouse = dist(mouseX, mouseY, this.pos.x, this.pos.y);
        var strokeColor = map(distanceToMouse, 0, MOUSE_RANGE, POINT_DARK, POINT_LIGHT)
        if (distanceToMouse > MOUSE_RANGE) return;

        var limitCount = 0;
        for (var i = 0; i < particles.length; i++) {
            if (this == particles[i]) continue;
            if (limitCount >= LINE_LIMIT_PER_POINT) break;

            var distanceToNeighbour = dist(this.pos.x, this.pos.y, particles[i].pos.x, particles[i].pos.y)
            if (distanceToNeighbour > LINE_RANGE) continue;

            stroke(LINE_NEIGHBOUR_EFFECT * map(distanceToNeighbour, 0, LINE_RANGE, LINE_DARK, LINE_LIGHT) + (1 - LINE_NEIGHBOUR_EFFECT) * strokeColor);
            strokeWeight(map(distanceToNeighbour, 0, LINE_RANGE, LINE_WIDTH_MIN, LINE_WIDTH_MAX));
            line(this.pos.x, this.pos.y, particles[i].pos.x, particles[i].pos.y);
            limitCount++;
        }

        strokeWeight(this.size);
        stroke(strokeColor);
        point(this.pos.x, this.pos.y);
    }

    this.update = function() {
        if (p5.Vector.sub(this.pos, this.targetPos).mag() > MOVEMENT_TARGET_SIZE) {
            this.pos.x = lerp(this.pos.x, this.targetPos.x, MOVEMENT_LERP_RATE);
            this.pos.y = lerp(this.pos.y, this.targetPos.y, MOVEMENT_LERP_RATE);
        } else {
            this.nextTarget();
        }
    }
}