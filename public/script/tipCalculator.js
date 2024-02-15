const tipCalculator = document.querySelector(".tip-calculator");
const numberInputs = document.querySelectorAll('input[type="number"]');
const displayInputs = document.querySelectorAll("#tipAmount, #total");
const preTipTotalInput = document.querySelector("#preTipTotal");
const customPercentageInput = document.querySelector("#customPercentage");
const radioInputs = document.querySelectorAll('input[type="radio"]');
const buttons = document.querySelectorAll("button[data-action]");
const tipAmount = document.querySelector("#tipAmount");
const totalInput = document.querySelector("#total");

const resetTipCalculator = () => {
	numberInputs.forEach((input) => {
		input.value = "";
		input.classList.remove("is-valid");
		input.classList.remove("is-invalid");
		input.setAttribute("aria-invalid", "false");
	});
	displayInputs.forEach((input) => (input.value = ""));
	radioInputs.forEach((radioInput) => {
		radioInput.checked = false;
	});
};

const calculateTotal = () => {
	let preTipTotal = +preTipTotalInput.value;
	let customPercentage = +customPercentageInput.value;

	if (preTipTotal > 0 && customPercentage > 0) {
		let tip = preTipTotal * (customPercentage / 100);
		let finalTotal = preTipTotal + tip;
		tipAmount.value = `£${tip.toFixed(2)}`;
		totalInput.value = `Your total bill, with tip, is £${finalTotal.toFixed(
			2
		)}`;
	}
};

const handleSubmit = (e) => {
	e.preventDefault();
	let firstInvalidInput = null;
	numberInputs.forEach((input) => {
		if (input.value === "") {
			input.classList.add("is-invalid");
			input.setAttribute("aria-invalid", "true");
			if (!firstInvalidInput) {
				firstInvalidInput = input;
			}
		} else {
			input.classList.remove("is-invalid");
			input.setAttribute("aria-invalid", "false");
		}
	});

	if (firstInvalidInput) {
		firstInvalidInput.focus();
	}
	calculateTotal();
};

const handleClick = (btn) => {
	const action = btn.getAttribute("data-action");
	const targetId = btn.getAttribute("data-target");

	if (action === "inc" || action === "dec") {
		const input = document.getElementById(targetId);
		if (!input) return;

		let value = +input.value;
		value = action === "inc" ? value + 1 : value - 1;
		input.value = Math.max(value, 0);
		input.focus();
		const event = new Event("input", {
			bubbles: true,
			cancelable: true,
		});
		input.dispatchEvent(event);
	} else if (action === "reset") {
		resetTipCalculator();
	}
};

const handleInput = (input) => {
	if (+input.value > 0) {
		input.classList.add("is-valid");
		input.classList.remove("is-invalid");
		input.setAttribute("aria-invalid", "false");
	} else {
		input.classList.remove("is-valid");
		input.classList.add("is-invalid");
		input.setAttribute("aria-invalid", "true");
	}
};

const handleBlur = () => {
	numberInputs.forEach((input) => {
		if (+input.value > 0) {
			input.classList.add("is-valid");
			input.classList.remove("is-invalid");
			input.setAttribute("aria-invalid", "false");
		} else {
			input.classList.remove("is-valid");
			input.classList.remove("is-invalid");
			input.setAttribute("aria-invalid", "true");
		}
	});
};

const handleFocus = () => {
	numberInputs.forEach((input) => {
		if (input.value === "0") {
			input.value = "";
		}
	});
};

const handleRadioInputChange = (radioInput) => {
	customPercentageInput.value = +radioInput.value;
	const event = new Event("input", { bubbles: true, cancelable: true });
	customPercentageInput.dispatchEvent(event);
};

buttons.forEach((button) => {
	button.addEventListener("click", () => handleClick(button));
});

numberInputs.forEach((input) => {
	input.addEventListener("input", () => handleInput(input));
	input.addEventListener("blur", () => handleBlur());
	input.addEventListener("focus", () => handleFocus());
});

radioInputs.forEach((radioInput) => {
	radioInput.addEventListener("change", () =>
		handleRadioInputChange(radioInput)
	);
});

export const handleTipCalculator = () => {
	if (tipCalculator) {
		tipCalculator.addEventListener("submit", handleSubmit);
	}
};
