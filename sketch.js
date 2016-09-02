var population;
var lifespan = 400;
var count = 0;
var lifeP;
var target;

var obstacle;
var dimensions;

function setup() {
  obstacle = createVector(100, 150);
  dimensions = createVector(222, 10);
    createCanvas(400, 300);
    population = new Population();
    lifeP = createP();
    target = createVector(width / 2, 50);
    frameRate(200)
}

function draw() {
    background(0);
    population.run();
    lifeP.html(count);
    count++;
    if (count == lifespan) {
        population.evaluate();
        population.selection();
        count = 0;
    }
    rect(obstacle.x, obstacle.y, dimensions.x, dimensions.y);
    ellipse(target.x, target.y, 11, 11)
}
