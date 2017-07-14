var tickerX;
var news = [
    "BREAKING NEWS: NEWS BREAKING NOW DECLARED ILLEGAL",
    // "THIS WEBSITE CANNOT BE ACCESSED ON A TRAMPOLINE",
    // ""
];

function setup() {
    canvas = createCanvas(windowWidth, 100);
    canvas.class("pcanvas");
    canvas.parent('canvasContainer');

    noStroke();

    tickerX = width;
}

function draw() {
    background(255);
    // targetX = lerp(targetX, mouseX, 0.1);
    fill(200, 0, 0);
    rect(0, 0, width, 40);
    fill(220, 100, 100);
    rect(0, 40, width, 30);
    // ellipse(targetX, height / 2, 10, 10);

    fill(255);
    textStyle(BOLD);
    textStyle(ITALIC);
    textSize(40);
    text(news[0], tickerX, 60);

    if (tickerX + textWidth(news[0]) > 0) tickerX -= 5;
    else tickerX = width;
}

function windowResized() {
    resizeCanvas(windowWidth, 100);
}