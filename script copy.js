function add(a, b){
    return parseInt(a) + parseInt(b);
}

function subtract(a, b){
    return parseInt(a) - parseInt(b);
}

function multiply(a, b){
    return parseInt(a) * parseInt(b);
}

function divide(a, b){
    return parseInt(a) / parseInt(b);
}

function operate(a, operator, b){
    if (operator == '+') return add(a, b);
    if (operator == '-') return subtract(a, b);
    if (operator == '*') return multiply(a, b);
    if (operator == '/') return divide(a, b);
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".charButtons");
const clearButton = document.querySelector(".clearButton");
const equalButton = document.querySelector(".equalButton");

let first_number = "";
let operator = "";
let last_number = "";
let shouldResetDisplay = false;

// agregar caracteres al display
buttons.forEach(button => {
    button.addEventListener("click", function() {
        const char = button.textContent;

        // si se mostró un resultado, reiniciar display al empezar nuevo número
        if (shouldResetDisplay && !isNaN(char)) {
            display.textContent = "";
            shouldResetDisplay = false;
        }

        // evitar operadores consecutivos
        const lastChar = display.textContent.slice(-1);
        if ("+-*/".includes(lastChar) && "+-*/".includes(char)) {
            display.textContent = display.textContent.slice(0, -1) + char;
            return;
        }

        display.textContent += char;
    });
});

equalButton.addEventListener("click", function() {
    // detectar el operador
    for (let char of display.textContent) {
        if ("+-*/".includes(char)) {
            operator = char;
            break;
        }
    }

    // si no hay operador, cancelar
    if (!operator) return;

    const expresion = display.textContent.split(operator);
    first_number = expresion[0];
    last_number = expresion[1];

    // validar que haya dos números
    if (first_number === "" || last_number === "" || isNaN(last_number)) return;

    // manejo de división por cero
    if (operator === "/" && last_number === "0") {
        alert("You can't divide by 0!");
        return;
    }

    // calcular y redondear resultado
    let result = operate(first_number, operator, last_number);
    result = Math.round(result * 1000) / 1000;

    // mostrar resultado
    display.textContent = result;
    shouldResetDisplay = true;

    // preparar para siguiente operación encadenada
    first_number = result;
    operator = "";
    last_number = "";
});

clearButton.addEventListener("click", function() {
    display.textContent = "";
    first_number = "";
    operator = "";
    last_number = "";
});
