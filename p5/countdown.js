// count down days in advance
var ENDTIME = [2016, 9, 21, 22, 00, 00];
var STARTTIME = [2015, 04, 23, 11, 30, 23];
var SCALE = [0.1, 0.2, 0.3, 0.4, 0.6, 0.8];
var YEAR = 0;
var MONTH = 1;
var DAY = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;

var MAX_SIZE;
var UNIT;

var COLOR = "rgba(255, 255, 255, 1)";
var COLOR2 = "rgba(255, 255, 255, 0.1)";

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
  years = year();
  months = month();
  days = day();
  hours = hour();
  minutes = minute();
  seconds = second();

  // clear screen
  background(0);

  // draw little outlines
  drawclock();

  noFill();
  stroke(255);
  strokeWeight(6);
  arc(width/2, height/2, SCALE[SECOND]*MAX_SIZE, SCALE[SECOND]*MAX_SIZE, -HALF_PI,
    2*PI*map(60-seconds, 0, 60, 0, 0.999)-HALF_PI);

  strokeWeight(5);
  arc(width/2, height/2, 0.6*MAX_SIZE, 0.6*MAX_SIZE, -HALF_PI,
    2*PI*map(60-minutes, 0, 60, 0, 0.999)-HALF_PI);

  strokeWeight(4);
  arc(width/2, height/2, 0.4*MAX_SIZE, 0.4*MAX_SIZE, -HALF_PI,
    2*PI*map(23-hours, 0, 23, 0, 0.999)-HALF_PI);

  strokeWeight(3);
  arc(width/2, height/2, 0.3*MAX_SIZE, 0.3*MAX_SIZE, -HALF_PI,
    2*PI*map(30-days, 1, 30, 0, 0.999)-HALF_PI);

  strokeWeight(2);
  arc(width/2, height/2, 0.2*MAX_SIZE, 0.2*MAX_SIZE, -HALF_PI,
    2*PI*map(ENDTIME[MONTH]-months, 0, ENDTIME[MONTH]-STARTTIME[MONTH], 0.001, 0.999)-HALF_PI);

  strokeWeight(1);
  arc(width/2, height/2, 0.1*MAX_SIZE, 0.1*MAX_SIZE, -HALF_PI,
    2*PI*map(ENDTIME[YEAR]-years, 0, ENDTIME[YEAR]-STARTTIME[YEAR], 0.001, 0.999)-HALF_PI);

  // TEXT
  textAlign(CENTER)
  fill(255);
  noStroke();
  text(60-seconds + " seconds", width/2, height/2+(SCALE[SECOND]+0.05)*MAX_SIZE/2);
  text(60-minutes + " minutes", width/2, height/2+(SCALE[MINUTE]+0.05)*MAX_SIZE/2);
  text(23-hours + " hours", width/2, height/2+(SCALE[HOUR]+0.05)*MAX_SIZE/2);
  text(30-days + " days", width/2, height/2+(SCALE[DAY]+0.05)*MAX_SIZE/2);

  text(ENDTIME[1]-months + " months", width/2, height/2+(SCALE[MONTH]+0.05)*MAX_SIZE/2);
  text(ENDTIME[YEAR]-years + " years", width/2, height/2+(SCALE[YEAR]+0.05)*MAX_SIZE/2);

}

function drawclock() {
  for (var i = 0; i < SCALE.length; i++) {
    noFill();
    stroke(COLOR2);
    strokeWeight(1);
    ellipse(width/2, height/2, SCALE[i]*MAX_SIZE, SCALE[i]*MAX_SIZE);
  }
}
