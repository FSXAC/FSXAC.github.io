var FULLSCREEN_SKETCH = true
var body;

function setup() {
    if (FULLSCREEN_SKETCH) {
        canvas = createCanvas(windowWidth, windowHeight);
        canvas.class("pcanvas");
        canvas.position(0, 0);
    } else {
        var canvasWidth = document.getElementById('canvasContainer').offsetWidth
        canvas = createCanvas(canvasWidth, 100);
        canvas.class("pcanvas");
        canvas.parent('canvasContainer');
    }

    body = new Body();
}

function draw() {
    body.update();
    background(255);
    body.draw();
}

function windowResized() {
    if (FULLSCREEN_SKETCH) {
        resizeCanvas(windowWidth, windowHeight);
    } else {
        var canvasWidth = document.getElementById('canvasContainer').offsetWidth
        resizeCanvas(canvasWidth, 100);
    }
}

// =========[ UTILITY FUNCTIONS ]=========
function randInt(n) {
    return round(random(n));
}

function randRange(n1, n2) {
    return randInt(n2 - n1) + n1;
}

// ==========[ LEGS ]===========
function Leg(vS, mode) {
    // constructor

    this.legLength = 120;
    this.mode = mode;
    this.vS = vS;                   // Source of the leg
    this.vM = createVector(0, 0);   // Middle joint part of the leg
    this.vE = createVector(0, 0);   // End point of the leg

    this.update = function(target) {
        var diff = p5.Vector.sub(target, this.vS);
        var d = diff.mag();

        if (d >= 2 * this.legLength) {
            // if magnitude of difference is longer than leg
            // translate the legs
            diff.x *= this.legLength / d;
            diff.y *= this.legLength / d;
            this.vM.set(this.vS.x + diff.x, this.vS.y + diff.y);
            this.vE.set(this.vM.x + diff.x, this.vM.y + diff.y);
        } else {
            // move the end points
            this.vE.set(target.x, target.y);

            if (mode == 0)  diff.set(diff.y, -diff.y);
            else            diff.set(-diff.y, diff.y);

            diff.mult(sqrt(sq(this.legLength)-sqrt(d * 0.5)) / d);

            this.vM.set(
                (this.vS.x + this.vE.x) * 0.5 + diff.x,
                (this.vS.y + this.vE.y) * 0.5 + diff.y
            )
        }
    }

    this.draw = function() {
        strokeWeight(1);

        // draw upper leg
        stroke(255, 0, 0);
        line(this.vS.x, this.vS.y, this.vM.x, this.vM.y);

        // draw lower leg
        stroke(0, 0, 255);
        line(this.vE.x, this.vE.y, this.vM.x, this.vM.y);
    }
}

// ========[ FEET ]========
function Feet() {
    this.fL = createVector(0, 0);
    this.fR = createVector(0, 0);

    var stepLength, stepHeight, stepF, sXL, sXR;
    var triggerStepL, triggerStepR;
    var turnR = true;

    this.update = function(xL, xR, speed) {
        if (this.turnR) {
            if (!this.triggerStepR && (this.fR.x - xR > 150)) {
                this.triggerStepR = true;
                this.stepLength = (xR - this.fR.x) + random(-10, 100);
                this.stepHeight = abs(this.stepLength * random(0.4, 0.6));
                this.sXR = this.fR.x;
                this.stepF = 0;
            } else if (!this.triggerStepR && (this.fR.x - xR < -25)) {
                this.triggerStepR = true;
                this.stepLength = (xR - this.fR.x) + random(25, 125);
                this.stepHeight = abs(this.stepLength * random(0.4, 0.6));
                this.sXR = this.fR.x;
                this.stepF = 0;
            }

            if (this.triggerStepR) {
                this.stepR(this.fR, this.stepLength, this.stepHeight, speed);
            }
        } else {
            if (!this.triggerStepL && (this.fL.x - xL < -150)) {
                this.triggerStepL = true;
                this.stepLength = (xL - this.fL.x) + random(-100, 10);
                this.stepHeight = abs(this.stepLength * random(0.4, 0.6));
                this.sXL = this.fL.x;
                this.stepF = 0;
            } else if (!this.triggerStepL && (this.fL.x - xL > 25)) {
                this.triggerStepL = true;
                this.stepLength = (xL - this.fL.x) - random(25, 125);
                this.stepHeight = abs(this.stepLength * random(0.4, 0.6));
                this.sXL = this.fL.x;
                this.stepF = 0;
            }

            if (this.triggerStepL) {
                this.stepL(this.fL, this.stepLength, this.stepHeight, speed);
            }
        }
    }

    this.stepR = function(foot, stepLenth, stepHeight, speed) {
        var itp = map(constrain(speed, 0, 15), 0, 15, 0.25, 0.75);
        this.stepF = lerp(stepF, PI, itp);
        foot.x = this.sXR + this.stepLength * this.stepF / PI;
        foot.y = sin(this.stepF) * -this.stepHeight + height;

        if (this.stepF >= PI-0.01) {
            this.stepF = PI;
            this.triggerStepR = false;
            this.turnR = !this.turnR;
        }
    }

    this.stepL = function(foot, stepLenth, stepHeight, speed) {
        var itp = map(constrain(speed, 0, 15), 0, 15, 0.25, 0.75);
        this.stepF = lerp(stepF, PI, itp);
        foot.x = this.sXL + this.stepLength * this.stepF / PI;
        foot.y = sin(this.stepF) * -this.stepHeight + height;

        if (this.stepF >= PI-0.01) {
            this.stepF = PI;
            this.triggerStepL = false;
            this.turnR = !this.turnR;
        }
    }
}

// ========[ BODY ]========
function Body() {
    this.w = 200;
    this.h = 100;

    this.pos = createVector(width * 0.5, height - (this.h * 2));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.tgt = createVector(0, 0);

    this.vts = [];
    for (var i = 0; i < 4; i++) {
        this.vts[i] = createVector(0, 0);
    }

    this.feet = [];
    for (var i = 0; i < 3; i++) {
        this.feet[i] = new Feet();
    }

    this.legsR = [];
    this.legsL = [];
    for (var i = 0; i < 3; i++) {
        this.legsR[i] = new Leg(this.vts[2], 0);
        this.legsL[i] = new Leg(this.vts[3], 1);
    }

    this.decay = 0.8;

    this.update = function() {
        this.tgt.set(
            mouseX,
            constrain(
                mouseY, 
                height - (this.h * 2) + map(constrain(this.vel.mag(), 0, 15), 0, 15, -0.2 * this.h, 0.2 * this.h),
                height - (this.h * 0.6)
            )
        );

        // movements
        this.acc = p5.Vector.sub(this.tgt, this.pos);
        this.force = this.acc.mag();
        this.acc.normalize();
        this.acc.mult(this.force * 0.25);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.mult(this.decay);

        this.rdns = map(
            constrain(this.vel.x, -25, 25),
            -25,
            25,
            -PI * 0.0625,
            PI * 0.0625
        );

        this.vts[0].set(-0.5 * this.w, -0.5 * this.h);
        this.vts[1].set(0.5 * this.w, -0.5 * this.h);
        this.vts[2].set(0.5 * this.w, 0.5 * this.h);
        this.vts[3].set(-0.5 * this.w, 0.5 * this.h);
        for (var i = 0; i < this.vts.length; i++) {
            this.vts[i].rotate(this.rdns);
            this.vts[i].add(this.pos);
        }

        if (frameCount == 1) {
            // for (var i = 0; i < this.feet.length; i++) {
            for (var i = 0; i < 3; i++) {
                this.feet[i].fR.set(this.vts[2].x + random(25, 75), height);
                this.feet[i].fL.set(this.vts[3].x + random(-75, -25), height);
            }
        }

        // for (var i = 0; i < this.feet.length; i++) {
        for (var i = 0; i < 3; i++) {
            this.feet[i].update(this.vts[3].x, this.vts[2].x, this.vel.mag());
        }

        // for (var i = 0; i < this.legsR.length; i++) {
        for (var i = 0; i < 3; i++) {
            this.legsR[i].update(this.feet[i].fR);
            this.legsL[i].update(this.feet[i].fL);
        }
    }

    this.draw = function() {
        stroke(0);
        fill(255);

        beginShape();
        for (var i = 0; i < this.vts.length; i++) {
            vertex(this.vts[i].x, this.vts[i].y);
        }
        endShape(CLOSE);

        for (var i = 0; i < this.legsR.length; i++) {
            this.legsR[i].draw();
            this.legsL[i].draw();
        }
    }
}