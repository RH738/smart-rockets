function DNA(genes) {
    if (genes) {
        this.genes = genes;
    } else {
        this.genes = [];
        for (var i = 0; i < lifespan; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(0.1);
        }
    }

    this.crossover = function(partner) {
        var newGenes = [];
        var mid = floor(random(this.genes.length));
        for (var i = 0; i < this.genes.length; i++) {
            if (i > mid) {
                newGenes[i] = this.genes[i];
            } else {
                newGenes[i] = partner.genes[i];
            }
        }
        return new DNA(newGenes);
    }
}

function Rocket(dna) {
    this.pos = createVector(width / 2, height - 22);
    this.vel = createVector(0, 0); //p5.Vector.random2D();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    this.dna = dna || new DNA();
    this.fitness;

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.update = function() {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < 5) {
            this.completed = true;
            this.pos = target.copy();
        }
        if (this.pos.x > obstacle.x && this.pos.x < obstacle.x + dimensions.x && this.pos.y > obstacle.y && this.pos.y < obstacle.y + dimensions.y) {
            this.crashed = true;
        }


        this.applyForce(this.dna.genes[count]);
        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    }

    this.show = function() {
        push()
        noStroke();
        fill(255, 200);
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 5);
        pop();
    }
    this.calculateFitness = function() {
        var d = dist(
            this.pos.x,
            this.pos.y,
            target.x,
            target.y);
        if(this.crashed){
          console.log("crashed");
          this.fitness /= 10;
          return;
        }
        this.fitness = (map(d, 0, width, width, 0));
        if (this.completed) {
            this.fitness *= 10;
        }

    }

    this.mutation = function() {
        for (var i = 0; i < this.dna.length; i++) {
            if (random(1) > 0.11) {
                this.dna[i] = p5.Vector.random2D();
            }
        }
    }
}
