var colors;

function setup() {
    var canvasWidth = document.getElementById('canvasContainer').offsetWidth
    canvas = createCanvas(canvasWidth-6, 300);
    // canvas.position(0, 0);
    canvas.class("pcanvas");
    canvas.parent('canvasContainer');
    strokeWeight(5);

    // colors
    colors = [
        color(255, 0, 0),
        color(0, 255, 0),
        color(0, 0, 255)
    ];
}

function draw() {
    blendMode(BLEND);
    background(255);
    blendMode(EXCLUSION);
    noFill();
    
    for (var i = 0; i < 3; i++) {
        stroke(colors[i]);
        beginShape();
        for(var w = -20; w < width + 20; w += 5) {
            var h = 0.5 * height;
            // h += 200 * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);

            // amplitude
            var a = 10;

            // frequency
            var f = 0.05;

            // phase 
            var phase = 0.07*frameCount;

            // second wave
            var a2 = map(abs(mouseY-0.8*height), 0, height, 2, 6)/(1+50*pow(map(abs(mouseX-w), 0, width, 0, 1), 2));

            // frequency
            var f2 = 0.01;

            // phase
            var phase2 = 0.02*frameCount;

            // wave offset
            var phaseOffset = i * TWO_PI/3;

            // noise
            // noise amplitude
            var na = 10;

            // noise phase
            var nphase = 0.02*frameCount;

            var noiseOffset = na*noise(w, nphase)-0.5;
            h += a*sin((f*w) + phase + phaseOffset) * pow(a2*sin((f2*w) + phase2), 2);
            h += noiseOffset;
            curveVertex(w, h);
        }
        endShape();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// function mousePressed() {
//     createP("test P")
// }