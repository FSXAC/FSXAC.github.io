
let backgroundSale = [];
let extraSale = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class("pcanvas");

    // setup drawing
    smooth();
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    noStroke();

    for (let i = 0; i < 30; i++) {
        backgroundSale.push(new Particle(Math.random() * width, Math.random() * height, 0, 3));
    }

    background(230, 230, 50);
}

function draw() {
    background(230, 230, 50);
    for (let bi = 0; bi < backgroundSale.length; bi++) {
        backgroundSale[bi].draw();
        if (backgroundSale[bi].outsideScreen()) {
            backgroundSale[bi].resetRandomTopPosition();
        }
    }

    if (mouseIsPressed) {
        let newParticle = new Particle(mouseX, mouseY, Math.random() * 1, Math.random() * 4);
        newParticle.setAcceleration(0, 0.07);
        extraSale.push(newParticle);
    }

    let deleteList = [];
    for (let ei = 0; ei < extraSale.length; ei++) {
        extraSale[ei].draw();
        if (extraSale[ei].outsideScreen()) {
            deleteList.push(extraSale[ei]);
        }
    }

    for (let j = 0; j < deleteList.length; j++) {
        let delIndex = extraSale.indexOf(deleteList[j]);
        if (delIndex > -1) {
            extraSale.splice(delIndex, 1);
        }
    }
}

function randChoose(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}

const outsidePadding = 100;
class Particle {
    constructor(x, y, vx, vy) {
        this.depth = Math.random() + 0.5;
        this.sale = randChoose([15, 25, 30, 30, 50, 50, 50, 67, 75, 75, 80, 80, 90]);
        this.text = '-' + this.sale + '\%';

        vx = vx || 0;
        vy = vy || 10;
        this.position = createVector(x, y);
        this.velocity = createVector(vx, vy);
        this.velocity.mult(1 / this.depth);
        this.acceleration = createVector(0, 0);
    }

    resetRandomTopPosition() {
        this.position.x = Math.random() * width;
        this.position.y = -50;
    }

    setAcceleration(x, y) {
        this.acceleration.x = x;
        this.acceleration.y = y;
    }

    draw() {
        fill(125, 161, 14);
        textSize(20 / this.depth);
        let w = textWidth(this.text) + 10;
        let h = 25 / this.depth;
        rect(this.position.x, this.position.y, w, h);
        fill(255);
        text(this.text, this.position.x, this.position.y);

        // Update
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.y = constrain(this.velocity.y, -8, 8);
    }

    outsideScreen() {
        return (this.position.x < -outsidePadding || this.position.x > width + outsidePadding || this.position.y > height + outsidePadding || this.position.y < -outsidePadding);
    }
}