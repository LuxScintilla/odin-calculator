const inputBox = document.querySelector(".input");
const outputBox = document.querySelector(".output");

const backspaceButton = document.querySelector("#backspace");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#equals");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator")
const dotButton = document.querySelector(".dot");

const regex = /[\*+\-\/]/g

let fields;
let firstNumber;
let secondNumber;
let seperator;
let operator;
let sum;

function displayInput() {
    inputBox.textContent += this.dataset.value;
}

//NUMBER BUTTONS-------------------------------------
let numberClicked = false;
function numberFunction() {
    inputBox.textContent += this.dataset.value;
    numberClicked = true;
}
for(let button of numberButtons) {
    button.addEventListener("click", numberFunction);
}

//DOT BUTTON-----------------------------------------
let dotClicked = false;
function dotFunction() {
    if(numberClicked == true) {
        inputBox.textContent += this.dataset.value;
        dotClicked = true;
        if(dotClicked == true) {
            dotButton.removeEventListener("click", dotFunction);
        } else if(dotClicked == false) {
            dotButton.addEventListener("click", dotFunction);
        }
    }
}
dotButton.addEventListener("click", dotFunction);

//OPERATOR BUTTONS------------------------------------
let operatorClicked = 0;
function operatorFunction() {
    if(inputBox.textContent.slice(-1) == ".") {
        numberClicked = false;
    }

    if(numberClicked == true) {
        inputBox.textContent += this.dataset.value;
        operatorClicked++
        numberClicked = false;
        dotClicked = false;
        dotButton.addEventListener("click", dotFunction);
    }
    if(operatorClicked > 1) {
        numberClicked = false;
        dotClicked = false;
        dotButton.addEventListener("click", dotFunction);
        calculateInput()
        inputBox.textContent += this.dataset.value;
        operatorClicked = 1;
    }
    console.log(operatorClicked);
}

for(let button of operatorButtons) {
    button.addEventListener("click", operatorFunction);
}

//CHECK INPUT FOR CALCULATION---------------------------
let sliced;
function calculateInput() {
    //SNARKY ERROR MESSAGE-------------------------------
    if(inputBox.textContent == "0/0") {
        inputBox.textContent = "To Infinity";
        outputBox.textContent = "and Beyond";
    }
    if(Math.sign(outputBox.textContent) == -1) {

        fields = inputBox.textContent.split(regex);

        //FIND A WAY TO FIX NEGATIVES!!!

        firstNumber = parseFloat(fields[0]);
        secondNumber = parseFloat(fields[1]);
        operator = inputBox.textContent.slice((fields[0].length), (fields[0].length+1));

        sum = operate(operator, firstNumber, secondNumber);
        if(sum % 1 != 0) {
            outputBox.textContent = sum.toFixed(1);
        } else {
            outputBox.textContent = sum.toFixed();
        }
        inputBox.textContent = outputBox.textContent;

    } else {
        fields = inputBox.textContent.split(regex);

        console.log(fields);

        firstNumber = parseFloat(fields[0]);
        secondNumber = parseFloat(fields[1]);
        operator = inputBox.textContent.slice((fields[0].length), (fields[0].length+1));

        sum = operate(operator, firstNumber, secondNumber);
        if(sum % 1 != 0) {
            outputBox.textContent = sum.toFixed(1);
        } else {
            outputBox.textContent = sum.toFixed();
        }
        inputBox.textContent = outputBox.textContent;
    }
}

//EQUALS BUTTON-----------------------------------------
equalsButton.addEventListener("click", function() {
    operatorClicked = 0;
    dotClicked = false;
    dotButton.addEventListener("click", dotFunction);

    calculateInput()

    sum = operate(operator, firstNumber, secondNumber);
    if(sum % 1 != 0) {
        outputBox.textContent = sum.toFixed(1);
    } else {
        outputBox.textContent = sum.toFixed();
    }

    inputBox.textContent = outputBox.textContent;
});

//CLEAR BUTTON--------------------------------------------
clearButton.addEventListener("click", function() {

    inputBox.textContent = "";
    outputBox.textContent = "0";

    firstNumber = "";
    secondNumber = "";
    operator = "";
    numberClicked = false;
    dotClicked = false;
    dotButton.addEventListener("click", dotFunction);
    operatorClicked = 0;
    poppedArray = []
});

//BACKSPACE BUTTON----------------------------------------
let pop;
let poppedArray = [];
backspaceButton.addEventListener("click", function() {
    let inputArray = inputBox.textContent.split("");
    pop = inputBox.textContent.slice(-1);
    poppedArray.push(pop);
    inputArray.pop();
    inputBox.textContent = inputArray.join("");

    console.log(poppedArray);
    for(let item of poppedArray) {
        if(item.match(".") == ".") {
            poppedArray = [];
            dotClicked = false;
            dotButton.addEventListener("click", dotFunction);
        }
        if(regex.test(item) == true) {
            if(typeof parseFloat(inputBox.textContent.slice(-1)) == "number") {
                poppedArray = [];
                operatorClicked = 0;
                numberClicked = true;
            }
        }
    }
});

//CALCULATION FUNCTIONS-----------------------------------
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
