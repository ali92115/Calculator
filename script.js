/**
 * This script is responsible for creating the overall logic flow of the calculator. It
 * consists of a calculator class where the behavior of the calculator is defined and 
 * query selectors to retrieve the information from the html file.
 * 
 * @author Ali Iftakhar
 * @version 8/14/2020
 */

class Calculator {
    constructor(currentOperandText, thePreviousText) {
        this.currentOperandText = currentOperandText;
        this.thePreviousText = thePreviousText;
        this.theOperation = "";
        /**
         * This variable ensures to check if we need to push our current display up
         * to the previous display. Useful when user to do more display after pressing
         * result.
         */
        this.shiftUp = false;
    }

    /**
     * This method appends a number to the end of the string value.
     * @param {number} number That we wish to append to the current display.
     */
    append(number) {
        if(!this.shiftUp) {
            if(number == "." && (this.currentOperandText.includes("."))) {
                return;
            }

            this.currentOperandText = this.currentOperandText.toString() + number.toString();
        }
    }

    /**
     * This method updates the display value with what we have calculated "behind the scenes" so
     * the user knows what the current values are.
     */
    update() {
        currentText.innerText = this.currentOperandText;
        previousText.innerText = this.thePreviousText;
        console.log(this.thePreviousText);
    }

    /**
     * This method deletes all the data that has been stored. Refreshes the calculator from scratch.
     */
    deleteAll() {
        this.currentOperandText = "";
        this.thePreviousText = "";
        currentText.innerText = this.currentOperandText;
        previousText.innerText = this.thePreviousText;
    }

    /**
     * Computes the arithmatic equation to find a result and stores it in thePreviousText.
     * @param {Number} firstValue is the first number we want to use for comp.
     * @param {Number} secondValue is the second number we want to use for comp.
     * @param {String} operand is the operator we will use between the two numbers.
     */
    compute(firstValue, secondValue, operand) {
        
        if(operand == "-") {
            this.thePreviousText = firstValue - secondValue;
        } else if(operand == "/") {
            this.thePreviousText = firstValue / secondValue;
        } else if (operand == "*") {
            this.thePreviousText = firstValue * secondValue;
        } else {
            this.thePreviousText = firstValue + secondValue;
        }

        this.thePreviousText = this.thePreviousText.toString();

    
    }

    /**
     * This method is responsible for dealing with an operator command and adjust the displays.
     * @param {String} operand is the operator that the user clicked.
     */
    operation(operand) {
        this.shiftUp = false;
        if(this.thePreviousText != "" && this.currentOperandText != "" ) {
            this.compute(Number(this.thePreviousText), Number(this.currentOperandText), this.theOperation);
            this.currentOperandText = "";
        } else { 
            if (this.currentOperandText != "" ) {
                this.thePreviousText = this.currentOperandText.toString();
                this.theOperation = operand.toString();
                this.currentOperandText = "";
            }
        }
    }

    /**
     * Deletes the last entry of the calculator.
     */
    delete() {
        if(this.currentOperandText != "") {
            this.currentOperandText = this.currentOperandText.substring(0, this.currentOperandText.length-1);
        }
    }

    /**
     * Computes the result of the computation.
     */
    result() {
        this.compute(Number(this.thePreviousText), Number(this.currentOperandText), this.theOperation);
        this.currentOperandText = this.thePreviousText;
        this.thePreviousText = "";
        this.shiftUp = true;
    }

}

/*
 Import all the buttons and displays we have for manipulation.
*/
let numberButtons = document.querySelectorAll("[data-number]");
let operationButtons = document.querySelectorAll("[data-operation]");
let resultButton = document.querySelector("[data-result]");
let deleteButton = document.querySelector("[data-delete]");
let clearButton = document.querySelector("[data-clear]");
let currentText = document.querySelector("[data-current]");
let previousText = document.querySelector("[data-previous]");

const myCalculator = new Calculator(currentText.innerText.toString(), previousText.innerText.toString());

/*
    Provide functionality to all the buttons that we have created in the calculator.
 */
numberButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        myCalculator.append(button.innerText);
        myCalculator.update();
    })
});

operationButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        myCalculator.operation(button.innerText);
        myCalculator.update();
    })
});

clearButton.addEventListener("click", function() {
    myCalculator.deleteAll();
    myCalculator.update();
});

deleteButton.addEventListener("click", function() {
    myCalculator.delete();
    myCalculator.update();
});

resultButton.addEventListener("click", function() {
    myCalculator.result();
    myCalculator.update();
});

