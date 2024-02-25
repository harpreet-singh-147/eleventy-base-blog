const percentageForm = document.querySelector(".percentage-form");
const inputs = document.querySelectorAll(".percentage-form-inputs");
const numberInputValue = document.querySelector("#numberEntered");
const percentageInputValue = document.querySelector("#percentage");
const buttons = document.querySelectorAll(".percentage-custom-btn");
const resultInput = document.querySelector("#result");

const result = () => {
	const number = numberInputValue.value;
	const percentage = percentageInputValue.value;
	if (number && percentage) {
		resultInput.value = `${
			(number * percentage) / 100
		} is ${percentage}% of ${number}`;
	}
};

const handleClick = (button) => {
	const action = button.getAttribute("data-action");
	const target = button.getAttribute("data-target");

	if (action === "inc" || action === "dec") {
		const input = document.getElementById(target);
		if (!input) return;

		let value = +input.value;
		value = action === "inc" ? value + 1 : value - 1;
		input.value = value;
		input.focus();
		const event = new Event("input", {
			bubbles: true,
			cancelable: true,
		});
		input.dispatchEvent(event);
		result();
	} else if (action === "reset") {
		inputs.forEach((input) => {
			input.value = "";
			input.setAttribute("aria-invalid", "false");
			input.classList.remove("is-invalid");
		});
	}
};

const handleInput = (e) => {
	if (!e.target.value) {
		resultInput.value = "";
		e.target.setAttribute("aria-invalid", "false");
	} else if (+e.target.value === 0) {
		e.target.setAttribute("aria-invalid", "true");
		e.target.classList.add("is-invalid");
	} else {
		e.target.setAttribute("aria-invalid", "false");
		e.target.classList.remove("is-invalid");
		result();
	}
};

export const handlePercentageCalculator = () => {
	if (percentageForm) {
		buttons.forEach((button) => {
			button.addEventListener("click", () => handleClick(button));
		});

		numberInputValue.addEventListener("input", handleInput);
		percentageInputValue.addEventListener("input", handleInput);
	}
};
