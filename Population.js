function Population() {
    this.rockets = [];
    this.popSize = 100;
    this.matingPool = [];

    for (var i = 0; i < this.popSize; i++) {
        this.rockets[i] = new Rocket();
    }

    this.run = function() {
        for (var i = 0; i < this.popSize; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }

    this.evaluate = function() {
        var maxFit = 0;
        for (var i = 0; i < this.popSize; i++) {
            this.rockets[i].calculateFitness(target);
            if (this.rockets[i].fitness > maxFit) {
                maxFit = this.rockets[i].fitness;
            }
        }
        this.matingPool = [];
        for (var i = 0; i < this.popSize; i++) {
            this.rockets[i].fitness /= maxFit;
            var n = floor(this.rockets[i].fitness * 100);
            for (var j = 0; j < n; j++) {
                this.matingPool.push(this.rockets[i]);
            }
        }
    }
    this.selection = function() {
        var newRockets = [];
        for (var i = 0; i < this.rockets.length; i++) {
            var parentA = random(this.matingPool).dna;
            var parentB = random(this.matingPool).dna;
            var child = parentA.crossover(parentB);
            newRockets[i] = new Rocket(child);
            newRockets[i].mutation();
        }
        this.rockets = newRockets;
    }
}
