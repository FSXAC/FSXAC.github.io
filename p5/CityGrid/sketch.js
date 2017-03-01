var p = new Array();

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class("pcanvas");

    // setup drawing
    smooth();
    strokeWeight(1.4);
    background(0);
    stroke(255, 0.5);

    // particle test
    for (var i = 0; i < 12; i++) {
        append(p, new Particle(createVector(width / 2, height / 2), i * 2*PI / 12));
    }
}


function draw() {
    // background(0);
    // fill(255);
    // text(int(frameRate()), 10, 10);
    for (part of p) {
        part.step();
    }
}

// particle class
function Particle(new_location, new_angle) {
    this.location = new_location;
    this.angle = new_angle;
    this.speed = 1;

    // one step into future
    this.step = function() {
        // save previous location for drawing
        var old_x = this.location.x;
        var old_y = this.location.y;

        // move current particle
        this.location.x += this.speed * sin(this.angle);
        this.location.y += this.speed * cos(this.angle);

        // change angle randomly
        this.angle += random(-0.03, 0.03);

        // draw line
        stroke(255);
        line(old_x, old_y, this.location.x, this.location.y);

        // delete itself if it hits window border
    }
}
