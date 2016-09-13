// count down days in advance
var endtime = [2017, 12, 21, 22, 00, 00];
var starttime = [2015, 04, 23, 11, 30, 23];
var YEAR = 0;
var MONTH = 1;
var DAY = 2;

var MAX_SIZE;
var UNIT;

var year;
var month;
var day;
var hour;
var minute;
var second;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  if (width > height) {
    MAX_SIZE = height;
  } else {
    MAX_SIZE = width;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  year = year();
  month = month();
  day = day();
  hour = hour();
  minute = minute();
  second = second();

  background(0);

  noFill();
  stroke(255);
  strokeWeight(6);
  arc(width/2, height/2, 0.8*MAX_SIZE, 0.8*MAX_SIZE, -HALF_PI, 2*PI*map(60-second, 0, 60, 0, 0.999)-HALF_PI);

  strokeWeight(5);
  arc(width/2, height/2, 0.6*MAX_SIZE, 0.6*MAX_SIZE, -HALF_PI, 2*PI*map(60-minute, 0, 60, 0, 0.999)-HALF_PI);

  strokeWeight(4);
  arc(width/2, height/2, 0.4*MAX_SIZE, 0.4*MAX_SIZE, -HALF_PI, 2*PI*map(23-hour, 0, 23, 0, 0.999)-HALF_PI);

  strokeWeight(3);
  arc(width/2, height/2, 0.3*MAX_SIZE, 0.3*MAX_SIZE, -HALF_PI, 2*PI*map(30-day, 1, 30, 0, 0.999)-HALF_PI);

  strokeWeight(2);
  arc(width/2, height/2, 0.2*MAX_SIZE, 0.2*MAX_SIZE, -HALF_PI, 2*PI*map(endtime[1]-month, starttime[1], endtime[1], 0.001, 1)-HALF_PI);

  strokeWeight(1);
  arc(width/2, height/2, 0.1*MAX_SIZE, 0.1*MAX_SIZE, -HALF_PI, 2*PI*map(endtime[YEAR]-year, 0, endtime[YEAR]-starttime[YEAR], 0, 0.999)-HALF_PI);

  // TEXT
  textAlign(CENTER)
  fill(255);
  noStroke();
  text(60-second + " seconds", width/2, height/2+0.85*MAX_SIZE/2);
  text(endtime[YEAR]-year + " years", width/2, height/2+0.15*MAX_SIZE/2);

}
