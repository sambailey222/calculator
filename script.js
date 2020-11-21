// the input written on display line 2
let input = 0;
// the first value entered into the display (to be operated on)
let inputValue1 = 0;
// the second value entered into the display (to be operated on)
let inputValue2 = 0;
// the mathematic function (e.g. +-*/)
let operator = 0;
// keep track of operator symbol for line1 display
let operatorSymbol = 0;
// keep track of whether display needs to be cleared
let operatorPressedLast = false;
// keep track of whether equals was pressed last
let equalsPressedLast = false;
// keep track of output
let output = 0;
// keep track of when clear is pressed



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



function symbolUpdate(symbol) {
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
    return;
}

// the display
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
// below required to make decimal button work correctly with initial 0
line2.textContent = 0;
// if text is a decimal point
// cehck to see if number is an integer
// if number is an integer, proceed as normal
// if not an integer, do nothing
// TRY ADDING TWO NUMBERS TOGETHER THEN CONTINUE TYPING
function updateDisplay(text) {
    if (input == Infinity) {
        clear();
    }
    if (input.toString().length < 10) {
        if (line2.textContent === "0") {
            line2.textContent = "";
        }
        if (equalsPressedLast == true) {
            inputValue1 = output;
            line1.textContent = "";
            operator = 0;
            operatorSymbol = 0;
        }
        if (text == ".") {
            if (Number.isInteger(parseFloat(line2.textContent))) 
            {
                line2.textContent += text;
                input = parseFloat(line2.textContent);
            }
            if (line2.textContent == "") 
            {
                line2.textContent = "0.";
            }
        } else {
        line2.textContent += text;
        input = parseFloat(line2.textContent);
        }
        operatorPressedLast = false;
        equalsPressedLast = false;
    }
}

function clear() {
    line1.textContent = "";
    line2.textContent = 0;
    input = 0;
    inputValue1 = 0;
    inputValue2 = 0;
    output = 0;
    operator = 0;
    operatorSymbol = 0;
    clearPressedLast = true;
    eqaulsPressedLast = false;
    operatorPressedLast = false;
}

// clear();

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

// INSERT BACKSPACE SCRIPT
function backSpace(num) {
    // take line2 and convert to string
    num = num.toString();
    num = num.substring(0, num.length - 1);
    input = num;
    if (input == "") 
    {
        input = 0;
    }
    line2.textContent = input;
}

const backSpaceButton = document.getElementById("backspace");
backSpaceButton.addEventListener("click", () => backSpace(input));

// INSERT POSNEG SCRIPT
function posNeg(num) {
    input = num * -1;
    line2.textContent = input;
}

const posNegButton = document.getElementById("posNeg");
posNegButton.addEventListener("click", () => posNeg(input))
// -- INPUT NUMBER BUTTONS -- //

// select all number buttons
// foreach number button add an event listener
// when click is triggered
// update text content of display with text content of said button
const numberButton = document.querySelectorAll(".num");
numberButton.forEach(btn => btn.addEventListener("click", () => updateDisplay(btn.textContent)));
console.log(numberButton);

// -- OPERATOR BUTTONS -- //
    
// when an operator is pressed multiple times, top line should evaluate the expression before continuing and not create text chain of operations
// inputValue1 should be being updated each time, along with inputValue 2

function operatorUpdate(symbol) {


    // this ensures that "operator chaining" works i.e. user can continue to evaluate expressions using operator buttons and not equals button
    // without this, they would always trigger the second operator they pressed (not the first already stored)
    //THIS IS CAUSING A PROBLEM WITH THE EQAULS FUNCTION. TRY 3 + 3 = 6, -
    // THE ACTUAL PROBLEM IS THAT THE OUTPUT VALUE 

    // problem is this:
    // currently when trying to chain operators, the second operator pressed is used to evaluate the expression, not the previous one.
    // case in which this is triggered:
        // operatorPressedLast = false;
        // equalsPressedLast = false;
        // basically equals needs to fire using the old operator, and retain the new one for next time


    // if (operatorSymbol !== symbol) {
        equals(symbol);
    // }

    // problem is this:
    // when pressing operator after pressing equals
    // inputValue1 is changed to 6
    // inputValue2 is changed to 6
    // old operator is being used (+)
    // output is changed to 12
    // minus is being added after the output

    
    symbolUpdate(symbol)
    
     // 1. NEITHER OPERATOR NOR EQUALS WERE PRESSED LAST (NUMBER/CLEAR PRESSED LAST)
        // global value of inputValue1 == current value, 
        // global value of operator == pressed operator
        // operatorSymbol = relevant symbol
        // global value of inputValue2 == doesn't need to be tracked yet. equals will track it.
        // set operatorPressedLast to true;
        // equalsPressedLast changed to false;
        // line1 is updated to display inputValue1 and operator

        // when an operator is pressed multiple times, top line should evaluate the expression before continuing and not create text chain of operations
// inputValue1 should be being updated each time, along with inputValue 2
// when I press an operator, input should go into inputValue1. 
// next time I press an operator, 
//      if inputValue1 is not 0, 
//          input == parseFloat(line2.textContent)
//          inputValue2 = input
//          line1.textContent = operate()
//          line2.textContent = "";

// when I press number -> operator -> number -> different operator
// the first operation should be done to the two numbers before the second operation
// currently the second operation is being triggered only
// the first operation should be triggered by the click of the second operator
// so if operator is not 0 (i.e. has a stored value)
// that operation should be executed and the result stored in inputValue1 and on line1

    if (operatorPressedLast == false && equalsPressedLast == false) 
    {

        if (inputValue1 == 0)
        {
            inputValue1 = parseFloat(input);
            line1.textContent += `${inputValue1} ${symbol} `;
            line2.textContent = 0;
        }
        else 
        {
            input == parseFloat(line2.textContent);
            inputValue2 = input;
            console.log(inputValue1);
            console.log(inputValue2);
            console.log(operator);
            output = operate(operator, inputValue1, inputValue2);
            console.log(output);
            line1.textContent = `${output} ${operatorSymbol} `;
            inputValue1 = output;
        }
        
        line2.textContent = 0;
        input = 0;
    }
    // 2. EQUALS WAS PRESSED LAST
        // when operator is pressed after equals has been pressed
        // operator and operatorSymbol are changed
        // output becomes inputValue1
        // inputValue1 and symbol are printed to line1
        // line2 is cleared waiting for number input
        // equalsPressedLast changed to false
        // operatorPressedLast changed to true

        // what needs to happen?
    // when pressing operator after pressing equals
    // output is made into inputvalue1 (happens in equals function)
    // new operator is stored (but not fired) (happens above in switch statement)
    // inputValue2 is not declared until either equals or another operator are pressed (at which point equals is run)
    // at this point, things updated as normal
    else if (equalsPressedLast == true)
    {
        line1.textContent = `${inputValue1} ${symbol} `;
        line2.textContent = 0;
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
        operatorSymbol = 0;
    }
    operatorPressedLast = true;
    equalsPressedLast = false;
    input = 0;
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

    // if user presses equals either immediately, or after pressing clear, the display should show 0
    // if user presses a number after pressing equals, line1 and inputValue1 should change to output value 
    // if a user types a number and presses equals, line1 should display that number and it should be stored in input1
function equals(symbol) {
    if (operator == 0) 
    {
        inputValue1 = parseFloat(line2.textContent);
        line1.textContent = inputValue1;
    }
    else if (equalsPressedLast == true) 
    {
            // inputvalue1 = output (already accomplished below)
        line1.textContent = inputValue1;
        operatorSymbol = symbolUpdate(symbol)
        inputValue2 = 0;
        line2.textContent = 0;
    }
    else 
    {
        input = parseFloat(line2.textContent);
        inputValue2 = input;
        if (operator == divide && inputValue2 == 0) 
            {
            line2.textContent = "not today";
            } 
        else 
        {
        output = operate(operator, inputValue1, inputValue2);
        console.log(inputValue1);
        console.log(inputValue2);
        console.log(operator);
        console.log(output);
        line1.textContent = `${inputValue1} ${operatorSymbol} ${inputValue2}`;
        // round answer to 4dp
        output = parseFloat(output.toFixed(4));
        // stop ridiculously large numbers from overflowing display by converting to expontential
        if (output.toString().length > 11) 
        {
            output = output.toExponential(0);
        }
        line2.textContent = output;
        inputValue1 = output;
        input = 0;
        } 
    }
    
    // else {
    //     inputValue1 = 0;
    //     inputValue2 = 0;
    //     output = 0;
    //     line2.textContent = output;
    // }
    // = operate(operator, inputValue1, inputValue2);
    equalsPressedLast = true;
        
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

