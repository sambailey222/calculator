// the first value entered into the display
let inputValue1 = 0;
// the second value entered into the display
let inputValue2 = 0;
// the mathematic function (e.g. +-*/)
let operator = 0;
// keep track of whether display needs to be cleared
let operatorPressedLast = "no";

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    return operator(num1, num2);
}

// the display
const line2 = document.getElementById("line2");

function updateDisplay(text) {
    line2.textContent += text;
}

function clear() {
    line2.textContent = "";
}

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

// INSERT POSNEG SCRIPT

// INSERT PERCENTAGE SCRIPT

// pressing equals is what needs to trigger the operate function, not pressing the corresponding button (+-/*).
// need to keep track of num1, num2, and operator
// when one of the number buttons is pressed
    // need to print that number to the screen
    // if an operator button has just been pressed
        // line2 text resets and begins afresh with new number
        // could track this in "operatorPressedLast" variable
        // change above between yes/no with each button click
        // if operatorPressedLast = yes
            // clear line2 before typing new number
        // if operatorPressedLast = no
            // do not clear line2 and update as normal
        // after either, set operatorPressedLast to "no"
// when one of the operator buttons is pressed, 
    // global value of inputValue1 == current value, 
    // global value of operator == pressed operator
    // global value of inputValue2 == doesn't need to be tracked yet. equals will track it.
    // set operatorPressedLast to "yes";
    // line1 is updated to display inputValue1 and operator
// when equals is pressed, 
    // global value of inputValue2 == current value
    // perform operate function with global values
    // display output of operate function on line2
    // display inputValue1 + operator + inputValue2 = on line1
// when +/- is pressed,
    // if inputValue1 is positive, change to negative
    // if inputValue2 is negative, change to positive
// when clear is pressed,
    // last character on line2 should be removed


const divideButton = document.getElementById("divide");
divideButton.addEventListener("click", updateDisplay);