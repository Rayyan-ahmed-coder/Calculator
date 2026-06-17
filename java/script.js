const result = document.querySelector(".result");
let operators = ["+", "-", "×", "÷"];
let evalValues = ["Error", "Undefined", "Overflow"];
let resultText = "";

const moveRight = () => {
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
    let MultiOperator = false;
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

document.addEventListener('keydown', function(event) {
    const pressedKey = event.key; // Capture the key pressed (e.g., "7", "1", "+", "-") 
    const matchingButton = document.getElementById(pressedKey);

    // If the button exists on your calculator, click it
    if (matchingButton) {
        event.preventDefault(); // Prevents page scrolling or default actions
        matchingButton.click(); // Triggers your button's existing click functionality
    }

    if (pressedKey === "h" || pressedKey === "H") {
        event.preventDefault();
        const HistoryButton = document.getElementById('H');
        if (HistoryButton) HistoryButton.click();
    }

    if (pressedKey === 'Enter') {
        event.preventDefault();
        const equalsButton = document.getElementById('=');
        if (equalsButton) equalsButton.click();
    } 

    if (pressedKey === 'C' || pressedKey === 'c') {
        const clearButton = document.getElementById('C');
        if (clearButton) clearButton.click();
    }

    if (pressedKey === 'Backspace' || pressedKey === 'Escape') {
        const clearLastCharbutton = document.getElementById('b');
        if (clearLastCharbutton) clearLastCharbutton.click()
    }
});


function calculate() {
    let resultText = result.textContent;
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

    evalResultText = result.textContent;

    let historyArray = JSON.parse(localStorage.getItem("history")) || [];

    historyArray.push({
        calculation: resultText,
        result: evalResultText
    });

    localStorage.setItem(
        "history",
        JSON.stringify(historyArray)
    );
    moveRight();
}