// the input written on display line 2
let input = 0;
// the first value entered into the display (to be operated on)
let inputValue1 = 0;
// the second value entered into the display (to be operated on)
let inputValue2 = 0;
// the mathematic function (e.g. +-*/)
let operator = 0;
// keep track of operator symbol for line1 display
let operatorSymbol = "";
// keep track of whether display needs to be cleared
let operatorPressedLast = false;
// keep track of whether equals was pressed last
let equalsPressedLast = false;
// keep track of output
let output = 0;

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
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

function updateDisplay(text) {
    if (input.toString().length < 10) {
        if (line2.textContent[0] == 0) {
            line2.textContent = "";
        }
    console.log(typeof line2.textContent);
    line2.textContent += text;
    input = parseFloat(line2.textContent);
    operatorPressedLast = false;
    equalsPressedLast = false;
    }
}

function clear() {
    line1.textContent = "";
    line2.textContent = "";
    inputValue1 = 0;
    inputValue2 = 0;
}

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

// INSERT BACKSPACE SCRIPT

// INSERT POSNEG SCRIPT

// -- INPUT NUMBER BUTTONS -- //

// select all number buttons
// foreach number button add an event listener
// when click is triggered
// update text content of display with text content of said button
const numberButton = document.querySelectorAll(".num");
numberButton.forEach(btn => btn.addEventListener("click", () => updateDisplay(btn.textContent)));
console.log(numberButton);

// -- OPERATOR BUTTONS -- //

// when one of the operator buttons is pressed, 
    // global value of inputValue1 == current value, 
    // global value of operator == pressed operator
    // global value of inputValue2 == doesn't need to be tracked yet. equals will track it.
    // set operatorPressedLast to true;
    // line1 is updated to display inputValue1 and operator


// 3 CASES FOR OPERATOR UPDATE
    // 1. NEITHER OPERATOR NOR EQUALS WERE PRESSED LAST (NUMBER/CLEAR PRESSED LAST)
        // global value of inputValue1 == current value, 
        // global value of operator == pressed operator
        // operatorSymbol = relevant symbol
        // global value of inputValue2 == doesn't need to be tracked yet. equals will track it.
        // set operatorPressedLast to true;
        // equalsPressedLast changed to false;
        // line1 is updated to display inputValue1 and operator
    // 2. EQUALS WAS PRESSED LAST
        // when operator is pressed after equals has been pressed
        // operator and operatorSymbol are changed
        // output becomes inputValue1
        // inputValue1 and symbol are printed to line1
        // line2 is cleared waiting for number input
        // equalsPressedLast changed to false
        // operatorPressedLast changed to true
    // 3. AN OPERATOR WAS PRESSED LAST
        // line1 is cleared
        // line2 is reset to 0
        // input reset to 0
        // inputValue1 reset to 0
        // operator == ""
        // operatorSymbol == ""
        // equalsPressedLast changed to false
        // operatorPressedLast changed to true
    
function operatorUpdate(symbol) {

    switch (symbol) {
        case "/": 
            operator = divide;
            operatorSymbol = "/";
            break;
        case "*":
            operator = multiply;
            operatorSymbol = "*";
            break;
        case "-":
            operator = subtract;
            operatorSymbol = "-"
            break;
        case "+":
            operator = add;
            operatorSymbol = "+";
            break;
    }
     // 1. NEITHER OPERATOR NOR EQUALS WERE PRESSED LAST (NUMBER/CLEAR PRESSED LAST)
        // global value of inputValue1 == current value, 
        // global value of operator == pressed operator
        // operatorSymbol = relevant symbol
        // global value of inputValue2 == doesn't need to be tracked yet. equals will track it.
        // set operatorPressedLast to true;
        // equalsPressedLast changed to false;
        // line1 is updated to display inputValue1 and operator
    if (operatorPressedLast == false && equalsPressedLast == false) 
    {
        inputValue1 = parseFloat(input);
        line1.textContent += `${inputValue1} ${symbol} `;
        line2.textContent = "";
        input = "";
    }
    // 2. EQUALS WAS PRESSED LAST
        // when operator is pressed after equals has been pressed
        // operator and operatorSymbol are changed
        // output becomes inputValue1
        // inputValue1 and symbol are printed to line1
        // line2 is cleared waiting for number input
        // equalsPressedLast changed to false
        // operatorPressedLast changed to true
    else if (equalsPressedLast == true)
    {
        inputValue1 = output;
        line1.textContent = `${inputValue1} ${symbol} `;
        line2.textContent = "";
    }
    // 3. AN OPERATOR WAS PRESSED LAST
        // line1 is cleared
        // line2 is reset to 0
        // input reset to 0
        // inputValue1 reset to 0
        // operator == ""
        // operatorSymbol == ""
        // equalsPressedLast changed to false
        // operatorPressedLast changed to true
    else if (operatorPressedLast == true)
    {
        line1.textContent = "";
        line2.textContent = 0;
        input = 0;
        inputValue1 = 0;
        operator = 0;
        operatorSymbol = "";
    }
    operatorPressedLast = true;
    equalsPressedLast = false;
} 

// add event listener to all operator buttons
const operatorButton = document.querySelectorAll(".operator");
operatorButton.forEach(btn => btn.addEventListener("click", () => operatorUpdate(btn.textContent)));

// when equals is pressed, 
    // global value of inputValue2 == current input value
    // perform operate function with global values
    // display output of operate function on line2
    // display inputValue1 + operator + inputValue2 = on line1
    // if an operator button is pressed next
        // inputValue1 becomes previous output
        // operator is updated with new symbol
        // inputValue1 and symbol are displayed on line1
    // else display is updated normally

function equals() {
    input = parseFloat(line2.textContent);
    inputValue2 = input;
    output = operate(operator, inputValue1, inputValue2);
    line1.textContent = `${inputValue1} ${operatorSymbol} ${inputValue2}`;
    line2.textContent = output;
    equalsPressedLast = true;
    // = operate(operator, inputValue1, inputValue2);
}

//  THIS CALCULATOR HAS NO BRACKETS, SO NEED TO EVALUATE EACH EXPRESSION AS SOON AS IT IS ENTERED AND KEEP A RUNNING TOTAL. WILL ALSO STOP LINE1 FROM OVERFLOWING.

const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", () => equals());

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


// when +/- is pressed,
    // if inputValue1 is positive, change to negative
    // if inputValue2 is negative, change to positive
// when clear is pressed,
    // last character on line2 should be removed

// can use operator pressed last to track if user tries to do division and multiplication one after other. if so, reset to 0. 
// think about edge case of + -. they should be able to do this without resetting!




    // function divideUpdate() { 
    //     operator = divide;
    //     inputValue1 = input;
    //     operatorPressedLast = true;
    //     line2.textContent = "";
    //     input = 0;
    //     line1.textContent += `${inputValue1} ${divideButton.textContent} `;
    // } 