// the user input written on display line 2
let input = 0;
// the first value entered into the display (to be operated on)
let inputValue1 = 0;
// the second value entered into the display (to be operated on)
let inputValue2 = 0;
// the mathematic function (e.g. +-*/)
let operator = 0;
// the operator symbol for line1 display
let operatorSymbol = 0;
// keep track of operator press
let operatorPressedLast = false;
// keep track of whether equals was pressed last
let equalsPressedLast = false;
// keep track of output of mathematical operations
let output = 0;

// -- MATHEMATICAL FUNCTIONS -- //
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

// -- SYMBOL UPDATE --// 
// get and store the symbol to be displayed to display line 1
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

// -- THE DISPLAY -- //
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
// below required to make decimal button work correctly with initial 0
line2.textContent = 0;

// -- CLEAR -- //
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

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

// -- INPUT NUMBERS TO DISPLAY -- //
function updateDisplay(text) {
    if (input == Infinity) {
        clear();
    }
    // only allow user to type while 9 digits or less displayed
    if (input.toString().length < 10) {
        // overwrite initial 0 when typing
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
            // only allow one decimal point to be inputted per number
            if (line2.textContent.toString().includes(".") == false) {
                // re-insert 0 if necessary
                if (line2.textContent == "") 
                {
                line2.textContent = "0";
                }
                line2.textContent += text;
            }
        } else {
        line2.textContent += text;
        input = parseFloat(line2.textContent);
        }
    }
    operatorPressedLast = false;
    equalsPressedLast = false;
}

const numberButton = document.querySelectorAll(".num");
numberButton.forEach(btn => btn.addEventListener("click", () => updateDisplay(btn.textContent)));

// -- BACKSPACE -- //
function backSpace(num) {
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

// -- POSNEG BUTTON -- //
function posNeg(num) {
    input = num * -1;
    line2.textContent = input;
}

const posNegButton = document.getElementById("posNeg");
posNegButton.addEventListener("click", () => posNeg(input))

// -- OPERATOR BUTTONS -- //
function operatorUpdate(symbol) {
    // running equals here ensures that "operator chaining" works i.e. user can evaluate the previous expression immediately using operator buttons and not equals button
    // without this, they would always trigger the second operator they pressed (not the previous one)
    equals(symbol);
    symbolUpdate(symbol)

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
            output = operate(operator, inputValue1, inputValue2);
            line1.textContent = `${output} ${operatorSymbol} `;
            inputValue1 = output;
        }
        line2.textContent = 0;
        input = 0;
    }
    else if (equalsPressedLast == true)
    {
        line1.textContent = `${inputValue1} ${symbol} `;
        line2.textContent = 0;
    }
    else if (operatorPressedLast == true)
    {
        clear();
    }
    operatorPressedLast = true;
    equalsPressedLast = false;
    input = 0;
} 

const operatorButton = document.querySelectorAll(".operator");
operatorButton.forEach(btn => btn.addEventListener("click", () => operatorUpdate(btn.textContent)));

// -- EQUALS -- //
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
        // stop user from dividing by 0
        if (operator == divide && inputValue2 == 0) 
            {
            line2.textContent = "not today";
            } 
        else 
        {
        output = operate(operator, inputValue1, inputValue2);
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
    equalsPressedLast = true;     
}

const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", () => equals());

// -- KEYBOARD SUPPORT -- //
let firstKeyDown = false;
const keyboardMessage = document.getElementById("keyboardMessage");
const keyboardGuide = document.getElementById("keyboardGuide");

window.addEventListener("keydown", function(e) {
    console.log(e);
// numbers
if (e.code == "Digit0" || e.code == "Numpad0") {
    updateDisplay(0)
}
if (e.code == "Digit1" || e.code == "Numpad1") {
    updateDisplay(1);
}
if (e.code == "Digit2" || e.code == "Numpad2") {
    updateDisplay(2);
}
if (e.code == "Digit3" || e.code == "Numpad3") {
    updateDisplay(3);
}
if (e.code == "Digit4" || e.code == "Numpad4") {
    updateDisplay(4);
}
if (e.code == "Digit5" || e.code == "Numpad5") {
    updateDisplay(5);
}
if (e.code == "Digit6" || e.code == "Numpad6") {
    updateDisplay(6);
}
if (e.code == "Digit7" || e.code == "Numpad7") {
    updateDisplay(7);
}
// key used for 8 as it is same button as *
if (e.key == "8" || e.code == "Numpad8") {
    updateDisplay(8);
}
if (e.code == "Digit9" || e.code == "Numpad9") {
    updateDisplay(9);
}
if (e.code == "Period" || e.code == "NumpadDecimal") {
    updateDisplay(".");
}
// operators (key used where more precise or straightforward)
if (e.key == "+") {
    operatorUpdate("+");
}
if (e.key == "-") {
    operatorUpdate("-");
}
if (e.key == "*" || e.code == "KeyX") {
    operatorUpdate("*");
}
if (e.key == "/") {
    operatorUpdate("/");
}
if (e.key == "=" || e.key == "Enter") {
    equals();
}
// Clear, backspace and PosNeg
if (e.key == "Escape") {
    clear();
}
if (e.code == "Backspace" || e.code == "Delete") {
    backSpace(input);
}
// backtick button for posNeg
if (e.code == "ArrowUp") {
    posNeg(input);
}
// ensures key guide appears after 1 keypress and stays onscreen
if (firstKeyDown == false) {
    keyboardMessage.style.display = "none";
    keyboardGuide.style.display = "block";
    firstKeyDown = true;
}
});


