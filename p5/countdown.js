// count down days in advance
// min starting time: 2016-01-01
// ALL TIME IN UTC
// js date format
var STARTTIME = new Date(Date.UTC(2016,1,1,0,0,0));
var ENDTIME = new Date(Date.UTC(2018,10,28,0,0,0));

// time conversion
var msPerMinute = 1000 * 60;
var msPerHour = msPerMinute * 60;
var msPerDay = msPerHour * 24;

// p5 display params
var MAX_SIZE;
var UNIT;
var COLOR = "rgba(255, 255, 255, 1)";
var COLOR2 = "rgba(255, 255, 255, 0.1)";

// difference in time in seconds
var diffES;
var diffEC;

// current time
var d;
var h;
var m;
var s;

var dd, dh, dm, dds;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  if (width > height) {
    MAX_SIZE = height;
  } else {
    MAX_SIZE = width;
  }

  // calculate the difference of time in seconds
  diffES = ENDTIME - STARTTIME;

  dd = Math.floor(diffES / msPerDay);
  diffES -= (diffES * msPerDay);
  dh = Math.floor(diffES / msPerHour);
  diffES -= (diffES * msPerHour);
  dm = Math.floor(diffES / msPerMinute);
  diffES -= diffES * msPerMinute;
  ds = Math.floor(diffES / 1000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // get current time
  var now = new Date(Date.UTC());
  diffEC = ENDTIME - now;

  d = Math.floor(diffEC / msPerDay);
  diffES = diffES - (diffEC * msPerDay);
  h = Math.floor(diffEC / msPerHour);
  diffES = diffES - (diffEC * msPerHour);
  m = Math.floor(diffEC / msPerMinute)
  diffES = diffES - diffEC * msPerMinute;
  s = Math.floor(diffEC / 1000);

  // clear screen
  background(0);

  // draw little outlines
  drawclock();

  // draw dials
  noFill();
  stroke(255);
  strokeWeight(6);
  arc(width/2, height/2, 0.8*MAX_SIZE, 0.8*MAX_SIZE, -HALF_PI,
    2*PI*map(60-s, 0, 60, 0, 0.999)-HALF_PI);

  strokeWeight(5);
  arc(width/2, height/2, 0.6*MAX_SIZE, 0.6*MAX_SIZE, -HALF_PI,
    2*PI*map(60-m, 0, 60, 0, 0.999)-HALF_PI);

  strokeWeight(4);
  arc(width/2, height/2, 0.4*MAX_SIZE, 0.4*MAX_SIZE, -HALF_PI,
    2*PI*map(23-h, 0, 23, 0.001, 0.999)-HALF_PI);

  strokeWeight(3);
  arc(width/2, height/2, 0.2*MAX_SIZE, 0.2*MAX_SIZE, -HALF_PI,
    2*PI*map(30-d, 0, 30, 0.001, 0.999)-HALF_PI);

  arc(width/2, height/2, 0.1*MAX_SIZE,0.1*MAX_SIZE, -HALF_PI,
    2*PI*map(1000-millis(), 0, 1000, 0, 1));

  // draw text
  textAlign(CENTER)
  fill(255);
  noStroke();
  text(60-s + " seconds", width/2, height/2+0.85*MAX_SIZE/2);
  text(60-m + " minutes", width/2, height/2+0.65*MAX_SIZE/2);
  text(23-h + " hours", width/2, height/2+0.45*MAX_SIZE/2);
  text(30-d + " days", width/2, height/2+0.25*MAX_SIZE/2);

}

function drawclock() {
  for (var i = 1; i < 5; i++) {
    noFill();
    stroke(COLOR2);
    strokeWeight(1);
    ellipse(width/2, height/2, i*0.2, i*0.2);
  }
}
