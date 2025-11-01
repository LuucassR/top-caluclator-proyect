function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  return Number(a) / Number(b);
}

function operate(a, operator, b) {
  if (operator == "+") return add(a, b);
  if (operator == "-") return subtract(a, b);
  if (operator == "*") return multiply(a, b);
  if (operator == "/") return divide(a, b);
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".charButtons");
const clearButton = document.querySelector(".clearButton");
const equalButton = document.querySelector(".equalButton");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

// Manejo de click en los números y operadores
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (["+", "-", "*", "/"].includes(value)) {
      // Si ya hay un primer número y operador, evaluamos
      if (firstNumber !== null && operator !== null && !waitingForSecondNumber) {
        const secondNumber = display.textContent;
        if (operator == "/" && secondNumber == "0") {
          alert("You can't divide by 0");
          display.textContent = "";
          firstNumber = null;
          operator = null;
          return;
        }

        const result = operate(firstNumber, operator, secondNumber);
        display.textContent = result;
        firstNumber = result; // Guardamos el resultado como nuevo primer número
        operator = value
      } else {
        firstNumber = display.textContent; // Guardamos el primer númer
        operator = value
      }

      
      waitingForSecondNumber = true; // Preparamos para el siguiente número
    } else {
      // Es un número
      if (waitingForSecondNumber) {
        display.textContent = ""; // Limpiamos para el nuevo número
        waitingForSecondNumber = false;
      }
      display.textContent += value;
    }
  });
});

// Igual
equalButton.addEventListener("click", () => {
  if (firstNumber !== null && operator !== null) {
    const secondNumber = display.textContent;
    if (operator == "/" && secondNumber == "0") {
      alert("You can't divide by 0");
      display.textContent = "";
      firstNumber = null;
      operator = null;
      return;
    }

    const result = operate(firstNumber, operator, secondNumber);
    if (result % 1 != 0){
        display.textContent = result.toFixed(4);
    }
    else{
        display.textContent = result;
    }
    firstNumber = null;
    operator = null;
  }
});

// Clear
clearButton.addEventListener("click", () => {
  display.textContent = "";
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = false;
});
