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
    for (var i = 0; i < 8; i++) {
        append(p, new Particle(createVector(width / 2, height / 2), i * 2*PI / 8));
    }
}


function draw() {
    // one way of writing for loops in JS
    // for (part of p) {
    //     part.step();
    // }
    for (var i = 0; i < p.length; i++) {
        p[i].step();
        if (p[i].blocked) p.splice(i, 1);
    }
}

// particle class
function Particle(new_location, new_angle) {
    // motion attributes
    this.location = new_location;
    this.angle = new_angle;
    this.speed = 3;

    // status
    this.blocked = false;

    // one step into future
    this.step = function() {
        // save previous location for drawing
        var old_x = this.location.x;
        var old_y = this.location.y;

        // move current particle
        // this.location.x += this.speed * sin(this.angle);
        // this.location.y += this.speed * cos(this.angle);

        // move current particle only on the 8 directions
        var angle_prime = PI / 4 * ceil(4 * this.angle / PI);
        this.location.x += this.speed * sin(angle_prime);
        this.location.y += this.speed * cos(angle_prime);

        // change angle randomly
        this.angle += random(-0.1, 0.1);

        // draw line
        stroke(255);
        line(old_x, old_y, this.location.x, this.location.y);

        // delete itself if it hits window border
        if (this.location.x < 1 ||
            this.location.x >= width - 1 ||
            this.location.y < 1 ||
            this.location.y >= height - 1) {
                this.blocked = true
        }
    }
}

function mouseClicked() {
    // particle test
    for (var i = 0; i < 4; i++) {
        append(p, new Particle(createVector(mouseX, mouseY), i * 2*PI / 4));
    }
}
