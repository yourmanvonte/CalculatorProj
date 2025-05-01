document.addEventListener("DOMContentLoaded", function () { // Wait for the DOM to load before executing the script
    let output = document.querySelector(".output");
    let currentInput = "";

    function displayOutput(value) {
        currentInput += value;
        output.textContent = currentInput;
    }   // Function to handle button clicks and displaying output

    function clearDisplay() {
        currentInput = "";
        document.querySelector(".output").textContent = "";
    } // Function to clear the display

    function calculate() {
        try {
            // Replace operators for safe evaluation
            let cleanInput = currentInput.replace(/[^-+*/%.0-9]/g, ""); // Regex expression to allow only numbers and operators

            if (cleanInput) {
                output.textContent = evaluateExpression(cleanInput);
                currentInput = output.textContent;
            } else {
                output.textContent = "Error";
            }
        } catch (error) {
            output.textContent = "Error";
        } 
    }

    function evaluateExpression(expression) { // Function to evaluate all expressions
        let tokens = expression.match(/(\d+\.?\d*|[-+*/%])/g);
        if (!tokens) return "Error";

        let stack = [];
        let currentOperator = null;

        tokens.forEach(token => {
            if (!isNaN(token)) {
                if (currentOperator) {
                    let num1 = stack.pop();
                    let num2 = parseFloat(token);
                    stack.push(applyOperation(num1, num2, currentOperator));
                    currentOperator = null;
                } else {
                    stack.push(parseFloat(token));
                }
            } else {
                currentOperator = token;
            }
        }); // Process the last operator if any

        return stack.length === 1 ? stack[0] : "Error"; // return the result or an error if the stack is not valid
    }

    function applyOperation(num1, num2, operator) { // Use switch case to take care of all operations
        switch (operator) {
            case "+": return num1 + num2;
            case "-": return num1 - num2;
            case "*": return num1 * num2;
            case "/": return num2 !== 0 ? num1 / num2 : "Error";
            case "%": return num1 % num2;
            default: return "Error";
        } // Apply the operation based on the operator
    }

    // Attach functions to global scope so buttons can call them
    window.displayOutput = displayOutput;
    window.clearDisplay = clearDisplay;
    window.calculate = calculate;
});