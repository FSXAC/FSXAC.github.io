var p = new Array();
var side = 100;

var heartSize_max = 1.8;
var heartSize = heartSize_max;
var heartSize_tgt = 1;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class("pcanvas");

    // setup drawing
    smooth();
    strokeWeight(1);
    background(0);
    stroke(255);
    rectMode(CENTER);

    // particle test
    for (var i = 0; i < 8; i++) {
        append(p, new Particle(
            createVector(width/2-side/2+i*side/8+side/16, height/2-side/2), PI
        ));
    }
    for (var i = 0; i < 8; i++) {
        append(p, new Particle(
            createVector(width/2-side/2, height/2-side/2+i*side/8+side/16), 3*PI/2
        ));
    }
    for (var i = 0; i < 8; i++) {
        append(p, new Particle(
            createVector(width/2-side/2+i*side/8+side/16, height/2+side/2-side/8), 0
        ));
    }
    for (var i = 0; i < 8; i++) {
        append(p, new Particle(
            createVector(width/2+side/2-side/8, height/2-side/2+i*side/8+side/16), PI/2
        ));
    }

}


function draw() {
    // background(0);

    stroke(255);
    strokeWeight(2);

    for (var i = 0; i < p.length; i++) {
        p[i].step();
        if (p[i].blocked) p.splice(i, 1);
    }

    fill(0);
    stroke(255);
    rect(width/2, height/2, side, side);

    // make lightning around the mouse
    // number of branches
    stroke(255, 50);
    var branches = random(2);
    for (var i = 0; i < branches; i++) {
        var steps = random(6);
        var x = width/2-25 + random(-10, 10);
        var y = height/2-25 + random(-10, 10);
        var weight = 3;
        for (var j = 0; j < steps; j++) {
            strokeWeight(weight);
            weight *= 0.5
            var next_x = x + random(-50, 50);
            var next_y = y + random(-50, 50);
            line(x, y, next_x, next_y);
            x = next_x;
            y = next_y;
        }
    }

    // draw heart
    heartbeat();
}

// particle class
function Particle(new_location, new_angle) {
    // motion attributes
    this.location = new_location;
    this.angle = new_angle;
    this.speed = 3;

    // status
    this.blocked = false;
    this.life = random(20, 200);

    // one step into future
    this.step = function() {
        // save previous location for drawing
        var old_x = this.location.x;
        var old_y = this.location.y;

        // move current particle
        this.location.x += this.speed * sin(this.angle);
        this.location.y += this.speed * cos(this.angle);

        // move current particle only on the 8 directions
        // var angle_prime = PI / 4 * ceil(4 * this.angle / PI);
        // this.location.x += this.speed * sin(angle_prime);
        // this.location.y += this.speed * cos(angle_prime);

        // change angle randomly (continuous)
        // this.angle += random(-0.01, 0.01);

        // change angle randomly (probability)
        var n = random(200);
        this.angle += (n > 198) ? PI/4 : (n < 1) ? -PI/4 : 0;

        // draw line
        stroke(map(dist(this.location.x, this.location.y, width/2, height/2), 0, 600, 255, 0))
        line(old_x, old_y, this.location.x, this.location.y);

        // delete itself if it hits window border
        if (this.location.x < 1 ||
            this.location.x >= width - 1 ||
            this.location.y < 1 ||
            this.location.y >= height - 1) {
                this.blocked = true;
                return;
        }

        // counts down life
        if (this.life > 0) {
            this.life--;
        } else {
            this.blocked = true;
            ellipse(this.location.x, this.location.y, 5, 5);
            return;
        }
    }
}

function heartbeat() {
    heartSize = heartSize > heartSize_tgt * 1.05 ? lerp(heartSize, heartSize_tgt, 0.1) : heartSize_max;
    drawHeart(width/2-25, height/2-25, heartSize);
}

function drawHeart(xref, yref, size) {
    fill(200, 0, 0);
    noStroke();
    beginShape();
    vertex(xref, yref);
    bezierVertex(xref, -10+yref, 20*size+xref, -5*size+yref, xref, 13*size+yref);
    vertex(xref, yref);
    bezierVertex(xref, -10+yref, -20*size+xref, -5*size+yref, xref, 13*size+yref);
    endShape();
}

function mouseClicked() {
    // particle test
    for (var i = 0; i < 4; i++) {
        append(p, new Particle(createVector(mouseX, mouseY), i * 2*PI / 4));
    }
}
