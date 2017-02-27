var particle_max_range;
var particle_max_range_dev;
var particle_angle_jitter;
var particle_angle_dev;
var particle_start_number;
var particle_p_straight;
var particle_p_left;
var particle_p_right;
var particle_speed;
var particle_fade_time;
var background_color;
var grid;

function randomizeParam() {
    particle_max_range     = random(0, 80);
    particle_max_range_dev = pow(10, random(-1, 2));
    particle_angle_jitter  = PI / pow(10, random(1, 3));
    particle_angle_dev     = PI / pow(10, random(0, 3));;
    particle_start_number  = random(3,8);
    particle_p_straight    = gauss(0.5, 0.5);
    particle_p_left        = gauss(0.5, 0.5);
    particle_p_right       = gauss(0.5, 0.5);
    if (particle_p_straight + particle_p_left + particle_p_right < 1){
        randomizeParam();
    }
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class("pcanvas");

    // setup initial values
    particle_max_range = 40;
    particle_max_range_dev = 5;
    particle_angle_jitter = PI / 1000;
    particle_angle_dev = PI / 10;
    particle_start_number = 1;
    particle_p_straight = 0.9;
    particle_p_left = 0.7;
    particle_p_right = 0.7;
    particle_speed = 1.5;
    particle_fade_time = 300;
    background_color = color(0);

    // setup drawing
    smooth();
    strokeWeight(1.4);
    background(0);

    // make new city grid
    grid = new Grid(createVector(width / 2, height / 2));
}

function draw() {
    grid.step();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function Particle(new_location, new_angle) {
    this.location = new_location;
    this.angle    = new_angle;
    this.speed    = particle_speed;
    this.time     = 0;
    this.max_time = int(gauss(particle_max_range, particle_max_range_dev)/this.speed);
    this.dead     = false;
    this.blocked  = false;

    this.step = function(){
        var old_location  = this.location.copy();
        this.location.x  += this.speed * sin(this.angle);
        this.location.y  += this.speed * cos(this.angle);
        this.angle       += gauss(0, particle_angle_jitter);
        this.time++;
        if (this.location.x < 1 ||
            this.location.x >= width - 1 ||
            this.location.y < 1 ||
            this.location.y >= height - 1) {
                this.blocked = true
        }
        var getx = int(this.location.x + sin(this.angle));
        var gety = int(this.location.y + cos(this.angle))
        // var currentPixel = pixels[getx + width * gety];
        var currentPixel = get(getx, gety);
        if (!this.checkPixel(currentPixel)) {
            this.blocked = true;
            stroke(255,0,0);
        }
        else if(this.time > this.max_time){
            this.dead = true;
        }
        line(old_location.x, old_location.y, this.location.x, this.location.y);
    }

    this.checkPixel = function(currentPixel) {
        if (currentPixel[0] == background_color.levels[0] &&
            currentPixel[1] == background_color.levels[1] &&
            currentPixel[2] == background_color.levels[2]) {
            return true;
        } else return false;
    }
}


function Grid(start) {
    this.grid_frame   = createGraphics(width, height, P2D);;
    this.particles    = new Array();
    this.line_opacity = 255;

    for (var i = 0; i < particle_start_number; i++){
        // this.particles.append(new Particle(start.copy(), random(2 * PI)));
        append(this.particles, new Particle(start.copy(), random(2 * PI)));
    }

    // step function to step one unit forward in time
    this.step = function() {
        if (this.line_opacity > 1) {
            loadPixels();
            for (var i = this.particles.length - 1; i >= 0; i--) {
                stroke(255, int(this.line_opacity));
                this.particles[i].step();
                if (this.particles[i].blocked) this.particles.splice(i, 1);
                else if (this.particles[i].dead) {
                    if (random(1) < particle_p_straight)
                        append(this.particles, new Particle(this.particles[i].location.copy(), this.particles[i].angle + gauss(0, particle_angle_dev / 2)));
                    if (random(1) < particle_p_left)
                        append(this.particles, new Particle(this.particles[i].location.copy(), this.particles[i].angle + gauss(PI / 2, particle_angle_dev)));
                    if (random(1) < particle_p_right)
                        append(this.particles, new Particle(this.particles[i].location.copy(), this.particles[i].angle + gauss(-PI / 2, particle_angle_dev)));
                    this.particles.splice(i, 1);
                }
            }
        }
        this.line_opacity = max(0, this.line_opacity - 255 / particle_fade_time);
    }
}


function gauss(mu, sigma){
    var x = 1;
    var y = 1;
    var s = 2;
    while (s >= 1){
        x = random(-1, 1);
        y = random(-1, 1);
        s = x * x + y * y;
    }
    return sigma * x * sqrt(-2 * log(s) / s) + mu;
}
