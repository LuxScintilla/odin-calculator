const inputBox = document.querySelector(".input");
const outputBox = document.querySelector(".output");

const backspaceButton = document.querySelector("#backspace");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#equals");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator")
const dotButton = document.querySelector(".dot");

let memory = {};

let fields;
let firstNumber;
let secondNumber;
let seperator;
let operator;

function inputDisplay() {
    inputBox.textContent += this.dataset.value;
}

for(let button of numberButtons) {
    button.addEventListener("click", inputDisplay)
}

let clicked = 0;
for(let button of operatorButtons) {
    button.addEventListener("click", function() {
        inputBox.textContent += this.dataset.value;
        clicked++

        if(clicked >= 2) {
            checkInput()
            inputBox.textContent += this.dataset.value;
            outputBox.textContent = operate(operator, firstNumber, secondNumber);
        }

    });
}

function checkInput() {

    fields = inputBox.textContent.split(/[.\*+-/_]/);

    console.log(fields);

    firstNumber = parseFloat(fields[0]);
    secondNumber = parseFloat(fields[1]);

    operator = inputBox.textContent.slice((fields[0].length), (fields[0].length + 1));
    console.log(operator);
    inputBox.textContent = operate(operator, firstNumber, secondNumber);
}

equalsButton.addEventListener("click", function() {

    checkInput()

    outputBox.textContent = operate(operator, firstNumber, secondNumber);

    inputBox.textContent = outputBox.textContent;
});

clearButton.addEventListener("click", function() {

    inputBox.textContent = "";
    outputBox.textContent = "0";

    firstNumber = "";
    secondNumber = "";
    operator = "";
    clicked = 0;
});

backspaceButton.addEventListener("click", function() {
    let inputArray = inputBox.textContent.split("");
    inputArray.pop();
    inputBox.textContent = inputArray.join("");
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
    if(operator == "+") {
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
