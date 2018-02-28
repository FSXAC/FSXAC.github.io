// p5
// var range = 50;
//
// function setup() {
//   canvas = createCanvas(windowWidth, windowHeight);
//   canvas.position(0, 0);
//   canvas.class("pcanvas");
// }
//
// function mouseMoved() {
//   stroke('rgba(1, 15, 29, 0.1)');
//   line(mouseX, mouseY,
//    mouseX + random(-range, range),
//    mouseY + random(-range, range));
// }
//
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
var distX  = 0;
var rectX  = 0;
var easing = 0.25;
var a      = 0;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class("pcanvas");
}

function draw() {
    fill(255, 15);
    noStroke();
    rect(0, 0, width, height);

    rectX += (distX - rectX)*easing;
    distX = 0;

    for (var i = 0; i < width; i += 20) {
        for (var j = 0; j < height - (height / 8); j += 100) {
            fill(
                map(i, 0, width, 25, 214),
                map(i, 0, width, 105, 231),
                map(j, 0, width, 30, 127),
                10);
            var tempP = noise(a)
            a += 0.1;
            var y = floor((height - tempP * map(mouseY, height, 0, 0.1, 0.8) * j) / 20) * 20;

            rect(i, y, 16, 16);
            if (a > 10000) a = 0;
        }
    }

    // make lightning around the mouse
    // number of branches
    // stroke(100, 100, 100, 50);
    // var branches = random(2);
    // for (var i = 0; i < branches; i++) {
    //     var steps = random(6);
    //     var x = mouseX + random(-10, 10);
    //     var y = mouseY + random(-10, 10);
    //     var weight = 3;
    //     for (var j = 0; j < steps; j++) {
    //         strokeWeight(weight);
    //         weight *= 0.5
    //         var next_x = x + random(-50, 50);
    //         var next_y = y + random(-50, 50);
    //         line(x, y, next_x, next_y);
    //         x = next_x;
    //         y = next_y;
    //     }
    // }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function particle() {
    this.previous = createVector();
    this.pos      = createVector();
    this.mouse    = createVector();

}
