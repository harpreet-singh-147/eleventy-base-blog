const calculatorDiv = document.querySelector(".calculator");
const buttons = document.querySelectorAll(".calculator-keys button");
const display = document.querySelector("#calculatorDisplay");
const errorMessage = document.querySelector("#calculatorErrorMessage");

let firstOperand = null;
let currentOperator = null;
let hasDecimal = null;

const reset = (resetDisplay = false) => {
	if (resetDisplay) {
		display.value = "";
		errorMessage.textContent = "";
	}
	firstOperand = null;
	currentOperator = null;
	hasDecimal = null;
};

const calculator = (num1, num2, operator) => {
	let value;

	switch (operator) {
		case "+":
			value = num1 + num2;
			break;
		case "-":
			value = num1 - num2;
			break;
		case "*":
			value = num1 * num2;
			break;
		case "/":
			if (num2 !== 0) {
				value = num1 / num2;
			} else {
				return "Cannot divide by zero";
			}
			break;
		case "%":
			value = num1 % num2;
			break;
		default:
			return "Invalid operator";
	}

	return value;
};

const inputDigit = (digit) => {
	display.value += digit;
};

const setDecimal = (decimal) => {
	if (!hasDecimal) {
		display.value += decimal;
		hasDecimal = true;
	}
};

const setOperator = (operator) => {
	if (!display.value) return;
	if (!firstOperand) {
		firstOperand = +display.value;
	}
	currentOperator = operator;
	display.value = firstOperand + currentOperator;
	hasDecimal = null;
};

const calculate = () => {
	const regex = /(-?\d+(?:\.\d+)?)\s*([\+\-\*\/%])\s*(-?\d+(?:\.\d+)?)/;
	const match = display.value.match(regex);

	if (match) {
		const num1 = +match[1];
		const operator = match[2];
		const num2 = +match[3];

		const result = calculator(num1, num2, operator);
		if (result === "Cannot divide by zero" || result === "Invalid operator") {
			errorMessage.textContent = result;
			return;
		}
		if (errorMessage.textContent.trim().length > 0) {
			errorMessage.textContent = "";
		}
		display.value = result;
		reset();
	}
};

const handleClick = (button) => {
	const digit = button.getAttribute("data-number");
	const operator = button.getAttribute("data-operator");
	const del = button.getAttribute("data-delete");
	const decimal = button.getAttribute("data-decimal");
	const equals = button.getAttribute("data-equal");

	if (["+", "-", "*", "/", "%"].includes(operator) && display.value === "-") {
		return;
	}

	if (operator === "-" && !display.value) {
		display.value += operator;
		return;
	}

	if (operator === "-" && firstOperand && currentOperator) {
		const matches = display.value.match(/-/g);
		const count = matches ? matches.length : 0;
		if (count === 3) {
			return;
		}
	}

	if (operator === "-" && firstOperand && currentOperator) {
		display.value += operator;
		return;
	}

	if (digit) {
		inputDigit(digit);
	} else if (operator) {
		setOperator(operator);
	} else if (del) {
		display.value = display.value.slice(0, -1);
	} else if (decimal) {
		setDecimal(decimal);
	} else if (equals) {
		calculate();
	} else {
		reset(true);
	}
};

const handleKeyDown = (e) => {
	if (e.key === "Tab" || e.key === " ") {
		return;
	}
	e.preventDefault();

	if (["+", "-", "*", "/", "%"].includes(e.key) && display.value === "-") {
		return;
	}

	if (e.key === "-" && !display.value) {
		display.value += e.key;
		return;
	}

	if (e.key === "-" && firstOperand && currentOperator) {
		const matches = display.value.match(/-/g);
		const count = matches ? matches.length : 0;
		if (count === 3) {
			return;
		}
	}

	if (e.key === "-" && firstOperand && currentOperator) {
		display.value += e.key;
		return;
	}

	if (e.key >= "0" && e.key <= "9") {
		inputDigit(e.key);
	} else if (["+", "-", "*", "/", "%"].includes(e.key)) {
		setOperator(e.key);
	} else if (e.key === ".") {
		setDecimal(e.key);
	} else if (e.key === "Enter") {
		calculate();
	} else if (e.key === "Backspace") {
		display.value = display.value.slice(0, -1);
	} else if (e.key === "Delete") {
		reset(true);
	}
};

export const handleCalculator = () => {
	if (calculatorDiv) {
		buttons.forEach((button) => {
			button.addEventListener("click", () => handleClick(button));
		});

		calculatorDiv.addEventListener("keydown", handleKeyDown);
	}
};
