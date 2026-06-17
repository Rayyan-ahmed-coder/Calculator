const historyList = document.getElementById("history-list");
const counter = document.getElementById("eval-counter");
const clearButton = document.getElementById('clear-btn');
const listItem = new createElement("li");

let historyArray = JSON.parse(localStorage.getItem("history")) || [];
let MultiDefaultBool = false;

const DefaultList = () => {
    // Create List Element
    const listItem =
        document.createElement("li");
    listItem.classList.add("history-item"); // Add Class
    listItem.textContent = "No Calculations yet";
    historyList.appendChild(listItem); // Append the List
};

const updateCounter = () => {
    counter.textContent = historyArray.length
};

// Click Event Listener For Clear Button
clearButton.addEventListener("click", clearHistory);


if (historyArray.length === 0) {
    historyList.textContent = "";
    DefaultList();
} else if (historyArray.length >= 1) {
    historyList.textContent = "";
    createList()
}

function createList() {
    historyArray.forEach(item => {
        let listItem = document.createElement("li");
        listItem.classList.add("history-item"); // Add class to list element

        // Create span Element
        let calculation = document.createElement("span");
        calculation.textContent = item.calculation;

        // Create strong Element
        let answer = document.createElement("strong");
        answer.textContent = "= " + item.result;

        // Append those two Elements
        listItem.appendChild(calculation);
        listItem.appendChild(answer);

        historyList.appendChild(listItem);
        updateCounter()
    });
}

function clearHistory() {
    localStorage.removeItem("history");
    historyList.innerHTML = ""; // Clear everything in historyList
    
    let listItem = document.createElement("li");

    listItem.textContent = "No Calculations yet";
    listItem.classList.add("history-item");

    historyList.appendChild(listItem);
    counter.textContent = "0";
}

function createElement(element) {
    document.createElement(element);
    console.log(element + `. Yup code is working`)
}