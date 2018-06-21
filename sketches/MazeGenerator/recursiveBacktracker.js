var sideLength = 64;
var rows, columns;

var grid = [];
var cellStack = [];
var currentCell;

var visitedCount = 0;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    frameRate(500);

    rows = floor(height / sideLength);
    columns = floor(width / sideLength);

    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < columns; col++) {
            grid.push(new Cell(col, row));
        }
    }

    // set current cell to the first one
    currentCell = grid[0];

    // drawing setup
    colorMode(HSB, 255);
}

function draw() {
    background(255);
    for (var i = 0, gridLength = grid.length; i < gridLength; i++) {
        grid[i].draw();
    }

    currentCell.visited = true;
    var nextCell = currentCell.checkNeighbors();
    // if the next cell is defined
    if (nextCell) {
        nextCell.visited = true;

        // push to stack
        cellStack.push(currentCell);

        // remove walls
        currentCell.removeWalls(nextCell);

        // move to the next cell
        currentCell = nextCell;
    } else {
        // no neighbour
        if (cellStack.length > 0) {
            currentCell = cellStack.pop();   
        }
    }
}

function getIndex(row, col) {
    if (col < 0 || row < 0 || col >= columns || row >= rows) return -1;
    else return (row * columns + col);
}

// ===== [ CELL CLASS ]=====
function Cell(col, row) {
    this.col = col;
    this.row = row;
    this.hue = map(row, 0, rows, 0, 200);
    this.brt = map(col, 0, columns, 100, 150);

    this.walls = [true, true, true, true];   // top, right, bottom, left
    this.visited = false;

    this.draw = function() {
        var x = this.col * sideLength;
        var y = this.row * sideLength;

        if (this.visited) {
            // fill("#8F8");
            // fill(this.hue, this.brt, 255);
            noStroke();
            rect(x, y, sideLength, sideLength);

            stroke(0);
            strokeWeight(10);
            if (this.walls[0]) line(x, y, x + sideLength, y);
            if (this.walls[1]) line(x + sideLength, y, x + sideLength, y + sideLength);
            if (this.walls[2]) line(x + sideLength, y + sideLength, x, y + sideLength);
            if (this.walls[3]) line(x, y + sideLength, x, y);
        }
    }

    this.checkNeighbors = function() {
        var neighbors = [];
        var top, right, bottom, left;

        top = grid[getIndex(this.row - 1, this.col)]
        right = grid[getIndex(this.row, this.col + 1)]
        bottom = grid[getIndex(this.row + 1, this.col)]
        left = grid[getIndex(this.row, this.col - 1)]

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);

        // if there is a valid neighbor, go to it
        if (neighbors.length > 0) {
            // get the next chosen cell
            var nextCell = neighbors[floor(random(0, neighbors.length))];
            return nextCell;
        } else {
            return undefined;
        }
    }

    this.removeWalls = function(otherCell) {
        var diffX = otherCell.col - this.col;
        if (diffX === 1) {  // going right
            this.walls[1] = false;
            otherCell.walls[3] = false;
            return;
        } else if (diffX === -1) {  // going left
            this.walls[3] = false;
            otherCell.walls[1] = false;
            return;
        }

        var diffY = otherCell.row - this.row;
        if (diffY === 1) {      // going down
            this.walls[2] = false;
            otherCell.walls[0] = false;
            return;
        } else if (diffY === -1) {  // going up
            this.walls[0] = false;
            otherCell.walls[2] = false;
            return;
        }
    }
}