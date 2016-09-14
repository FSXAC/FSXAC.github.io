// count down days in advance
// min starting time: 2016-01-01
// ALL TIME IN UTC
// js date format
var STARTTIME = new Date(Date.UTC(2016,1,1,0,0,0));
var ENDTIME = new Date(Date.UTC(2016,10,28,0,0,0));

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
  diffES = diffES - (diffES * msPerDay);
  dh = Math.floor(diffES / msPerHour);
  diffES = diffES - (diffES * msPerHour);
  dm = Math.floor//TODO: CONTINUE FROM HERE
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // get time
  y = year();
  m = month();
  d = day();
  h = hour();
  min = minute();
  s = second();

  // clear screen
  background(0);

  // draw little outlines
  drawclock();

  // draw dials
  noFill();
  stroke(255);
  strokeWeight(6);
  arc(width/2, height/2, SCALE[SECOND]*MAX_SIZE, SCALE[SECOND]*MAX_SIZE, -HALF_PI,
    2*PI*map(60-s, 0, 60, 0, 0.999)-HALF_PI);

  strokeWeight(5);
  arc(width/2, height/2, 0.6*MAX_SIZE, 0.6*MAX_SIZE, -HALF_PI,
    2*PI*map(60-m, 0, 60, 0, 0.999)-HALF_PI);

  strokeWeight(4);
  arc(width/2, height/2, 0.4*MAX_SIZE, 0.4*MAX_SIZE, -HALF_PI,
    2*PI*map(ENDTIME[HOUR]-h, 0, ENDTIME[HOUR]-STARTTIME[HOUR], 0.001, 0.999)-HALF_PI);

  strokeWeight(3);
  arc(width/2, height/2, 0.3*MAX_SIZE, 0.3*MAX_SIZE, -HALF_PI,
    2*PI*map(ENDTIME[DAY]-d, 0, ENDTIME[DAY]-STARTTIME[DAY], 0.001, 0.999)-HALF_PI);

  strokeWeight(2);
  arc(width/2, height/2, 0.2*MAX_SIZE, 0.2*MAX_SIZE, -HALF_PI,
    2*PI*map(ENDTIME[MONTH]-min, 0, ENDTIME[MONTH]-STARTTIME[MONTH], 0.001, 0.999)-HALF_PI);

  strokeWeight(1);
  arc(width/2, height/2, 0.1*MAX_SIZE, 0.1*MAX_SIZE, -HALF_PI,
    2*PI*map(ENDTIME[YEAR]-y, 0, ENDTIME[YEAR]-STARTTIME[YEAR], 0.001, 0.999)-HALF_PI);

  arc(width/2, height/2, (SCALE[YEAR]/2)*MAX_SIZE,(SCALE[YEAR]/2)*MAX_SIZE, -HALF_PI,
    2*PI*map(1000-millis(), 0, 1000, 0, 1));

  // draw text
  textAlign(CENTER)
  fill(255);
  noStroke();
  text(ENDTIME[SECOND]-s + " seconds", width/2, height/2+(SCALE[SECOND]+0.05)*MAX_SIZE/2);
  text(ENDTIME[MINUTE]-min + " minutes", width/2, height/2+(SCALE[MINUTE]+0.05)*MAX_SIZE/2);
  text(ENDTIME[HOUR]-h + " hours", width/2, height/2+(SCALE[HOUR]+0.05)*MAX_SIZE/2);

  text(ENDTIME[DAY]-d + " days", width/2, height/2+(SCALE[DAY]+0.05)*MAX_SIZE/2);
  text(ENDTIME[MONTH]-m + " months", width/2, height/2+(SCALE[MONTH]+0.05)*MAX_SIZE/2);
  text(ENDTIME[YEAR]-y + " years", width/2, height/2+(SCALE[YEAR]+0.05)*MAX_SIZE/2);

}

function drawclock() {
  for (var i = 0; i < SCALE.length; i++) {
    noFill();
    stroke(COLOR2);
    strokeWeight(1);
    ellipse(width/2, height/2, SCALE[i]*MAX_SIZE, SCALE[i]*MAX_SIZE);
  }
}
