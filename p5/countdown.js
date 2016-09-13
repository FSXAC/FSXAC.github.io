// count down days in advance
var ENDTIME = [2016, 10, 23, 15, 00, 0];
var STARTTIME = [2016, 9, 13, 11, 30, 0];
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

var y;
var m;
var d;
var h;
var m;
var s;

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
  // get time
  y = year();
  m = month();
  d = day();
  h = hour();
  m = minute();
  s = second();

  // clear screen
  background(0);

  // draw little outlines
  drawclock();

  // formalize time
  if (ENDTIME[SECOND] - s < 0) {
    ENDTIME[SECOND] = 59;
    if (ENDTIME[MINUTE] - m < 0) {
      ENDTIME[MINUTE] = 59;
      if (ENDTIME[HOUR] - h < 0) {
        ENDTIME[HOUR] = 23;
        if (ENDTIME[DAY] - d < 0) {
          ENDTIME[DAY] = 30;
          if (ENDTIME[MONTH]-m < 0) {
            ENDTIME[MONTH] = 11;
            ENDTIME[YEAR] -= 1;
          } else {
            ENDTIME[MONTH] -= 1;
          }
        } else {
          ENDTIME[DAY] -= 1;
        }
      } else {
        ENDTIME[HOUR] -= 1;
      }
    } else {
      ENDTIME[MINUTE] -= 1;
    }
  }

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
    2*PI*map(ENDTIME[MONTH]-m, 0, ENDTIME[MONTH]-STARTTIME[MONTH], 0.001, 0.999)-HALF_PI);

  strokeWeight(1);
  arc(width/2, height/2, 0.1*MAX_SIZE, 0.1*MAX_SIZE, -HALF_PI,
    2*PI*map(ENDTIME[YEAR]-y, 0, ENDTIME[YEAR]-STARTTIME[YEAR], 0.001, 0.999)-HALF_PI);

  // draw text
  textAlign(CENTER)
  fill(255);
  noStroke();
  text(ENDTIME[SECOND]-s + " seconds", width/2, height/2+(SCALE[SECOND]+0.05)*MAX_SIZE/2);
  text(ENDTIME[MINUTE]-m + " minutes", width/2, height/2+(SCALE[MINUTE]+0.05)*MAX_SIZE/2);
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
