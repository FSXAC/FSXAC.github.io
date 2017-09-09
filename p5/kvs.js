/* KVS simulation:
*/

var buzzer;

function preload() {
  buzzer = loadSound('hanzo.mp3');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
}

function mousePressed() {
  buzzer.play();
  background(255, 0, 255);
}
