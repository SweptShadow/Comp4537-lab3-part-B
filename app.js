// Main file for Part A and debugging
const MathOperations = require('./modules/math.js');

class DebugApplication {

    constructor() {
        this.math = new MathOperations();
    }

    run() {

        const x = 10;
        const y = 5;
        const sum = this.math.add(x, y);
        const diff = this.math.subtract(x, y);

        console.log(`Hey Dalraj Debugging testing: the sum = ${sum}, diff = ${diff}`);
    
    }
}

new DebugApplication().run();
