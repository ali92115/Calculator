class Calculator {
    constructor(currentOperandText, thePreviousText) {
        this.currentOperandText = currentOperandText;
        this.thePreviousText = thePreviousText;
        this.theOperation = "";
    }

    append(number) {
        if(number == "." && (this.currentOperandText.includes("."))) {
            return;
        }
        this.currentOperandText = this.currentOperandText.toString() + number.toString();
    }

    update() {
        currentText.innerText = this.currentOperandText;
        console.log(this.thePreviousText);
    }

    deleteAll() {
        this.currentOperandText = "";
        this.thePreviousText = "";
        currentText.innerText = this.currentOperandText;
        previousText = this.thePreviousText;
    }

    compute(firstValue, secondValue, operand) {
        switch(operand) {
            case "+":
                return (firstValue+secondValue).toString();
            case "-":
                return (firstValue-secondValue).toString();
            case "*":
                return (firstValue*secondValue).toString();
            case "/":
                return (firstValue/secondValue).toString();
        }
    }

    operation(operand) {
        if(this.thePreviousText != "" && this.currentOperandText != "" ) {
            this.thePreviousText = this.compute(Number(this.thePreviousText), Number(this.currentOperandText), this.theOperation);
            this.currentOperandText = "";
        } else { 
            if (this.currentOperandText != "" ) {
                this.thePreviousText = this.currentOperandText.toString();
                this.theOperation = operand.toString();
                this.currentOperandText = "";
            }
        }
    }

}


let numberButtons = document.querySelectorAll("[data-number]");
let operationButtons = document.querySelectorAll("[data-operation]");
let resultButton = document.querySelector("[data-result]");
let deleteButton = document.querySelector("[data-delete]");
let clearButton = document.querySelector("[data-clear]");
let currentText = document.querySelector("[data-current]");
let previousText = "";

const myCalculator = new Calculator(currentText.innerText.toString(), "");

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

