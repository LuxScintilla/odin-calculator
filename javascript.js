const inputBox = document.querySelector(".input");
const outputBox = document.querySelector(".output");

const backspaceButton = document.querySelector("#backspace");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#equals");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator")
const dotButton = document.querySelector(".dot");

let memory = {};
let clicked = false;

function inputDisplay() {
    inputBox.textContent += this.dataset.value;
    if(this.dataset.value == "+") {
        for(let button of operatorButtons) {
            button.removeEventListener("click", inputDisplay)
        }
    }
}

for(let button of numberButtons) {
    button.addEventListener("click", inputDisplay)
}

for(let button of operatorButtons) {
    button.addEventListener("click", inputDisplay)
}

equalsButton.addEventListener("click", function() {

    let fields = inputBox.textContent.split("+" || "-" || "*" || "/");

    memory.firstNumber = fields[0];
    memory.secondNumber = fields[1];

    memory.operator = inputBox.textContent.slice((fields[0].length), (fields[0].length + 1));

    console.log(memory);

    for(let button of operatorButtons) {
        button.addEventListener("click", inputDisplay)
    }
});

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function operate(operator, firstNumber, secondNumber) {
    if(operator == "+" ) {
        return add(firstNumber, secondNumber)
    } else if(operator == "-") {
        return subtract(firstNumber, secondNumber)
    } else if(operator == "*") {
        return multiply(firstNumber, secondNumber)
    } else if(operator == "/") {
        return divide(firstNumber, secondNumber)
    } else {
        console.log("error");
    }

}
