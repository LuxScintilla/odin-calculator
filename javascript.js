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

let fields;
let newFields;
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

for(let button of operatorButtons) {
    button.addEventListener("click", function() {
        inputBox.textContent += this.dataset.value;
    });
}

function checkInput() {

    fields = inputBox.textContent.split(/[.\*+-/_]/);

    console.log(fields);

    firstNumber = parseFloat(fields[0]);
    secondNumber = parseFloat(fields[1]);

    operator = inputBox.textContent.slice((fields[0].length), (fields[0].length + 1));
    console.log(operator);
}

equalsButton.addEventListener("click", function() {

    checkInput()
    console.log(inputBox.textContent);

    outputBox.textContent = operate(operator, firstNumber, secondNumber);
});

clearButton.addEventListener("click", function() {

    inputBox.textContent = "";
    outputBox.textContent = "0";

    firstNumber = "";
    secondNumber = "";
    operator = "";
});

backspaceButton.addEventListener("click", function() {
    let inputArray = inputBox.textContent.split("");
    inputArray.pop();
    inputBox.textContent = inputArray.join("");
});

function add(firstNumber, secondNumber) {
    console.log(firstNumber + secondNumber);
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    console.log(firstNumber - secondNumber);
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    console.log(firstNumber * secondNumber);
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    console.log(firstNumber / secondNumber);
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
