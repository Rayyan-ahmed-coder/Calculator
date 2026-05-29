let result = document.querySelector(".result");
let operators = ["+", "-", "×", "÷"];
let evalValues = ["Error", "Undefined", "Overflow"];
console.log("Code running");
// × ÷

function moveRight() {
    result.scrollLeft = result.scrollWidth;
}

function append(number) {
    evalValues = ["0", "Error", "Undefined", "Overflow"];

    if (evalValues.includes(result.textContent)) {
        result.textContent = number;
    } else {
        result.textContent += number;
    } moveRight()
}

function operate(operator) {
    let NewOperators = ["+", "×", "÷"];
    let resultLastCharacter = result.textContent.slice(-1);

    // Prevent two operators together
    if (NewOperators.includes(resultLastCharacter) && operator === "-") {
        result.textContent += "-"
    } 
    else if (operators.includes(resultLastCharacter)) {
        result.textContent = result.textContent.slice(0, -1) + operator;
    } 
    else if (evalValues.includes(result.textContent)) {
        result.textContent = "0" + operator;
    } 
    else {
        result.textContent += operator;
    } moveRight()
}

function percentage(percent) {
    let resultLastCharacter = result.textContent.slice(-1);

    if (operators.includes(resultLastCharacter)) {
        result.textContent = result.textContent.slice(0, -1) + percent;
    } 
    else if (evalValues.includes(result.textContent)) {
        result.textContent = "0" + percent;
    } 
    else {
        result.textContent += percent;
    } moveRight()
}

function clearResult() {
    result.textContent = "0";
}

function back() {
    if (result.textContent.length === 1 || evalValues.includes(result.textContent)) {
        result.textContent = "0";
    } else {
        result.textContent = result.textContent.slice(0, -1);
    }
}

function point() {
    let currentNumber = result.textContent.split(/[+\-×÷]/).pop();

    if (!currentNumber.includes(".")) {
        let resultLastCharacter = result.textContent.slice(-1);

        if (operators.includes(resultLastCharacter)) {
            result.textContent += "0.";
        } 
        else if (evalValues.includes(result.textContent)) {
            result.textContent = "0.";
        } 
        else {
            result.textContent += ".";
        }
    }
    moveRight();
}

function calculate() {
    let calculationVar = true;
    let newResult = result.textContent
    .replaceAll('%', '/100')
    .replaceAll('×', '*')
    .replaceAll('÷', '/');

    try {    
        result.textContent = eval(newResult);
        console.log("Calculation Successful");
    } catch {
        result.textContent = "Error";
        console.log("Error. Calculation Unsuccessful");
        calculationVar = false;
    } 
    
    if (result.textContent === "Infinity") {
        result.textContent = "Overflow";
        console.log("Calculation Overflow");
    } else if (!isFinite(result.textContent) && calculationVar === true) {
        result.textContent = "Undefined";
        console.log("Output: Undefined");
    } calculationVar = true;
    moveRight()
}