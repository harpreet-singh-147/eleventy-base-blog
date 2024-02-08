import {
	validateInput,
	handleInput,
	hideError,
	showError,
} from "./handleFormErrors.js";

const registerForm = document.querySelector("#register");
const inputs = document.querySelectorAll(".register__form-input");
const errorIcons = document.querySelectorAll(".register__form-error-icon");
const labels = document.querySelectorAll(".register__form-label");
const errorMessages = document.querySelectorAll(".register__form-error");

const updateLabelPosition = (input) => {
	input.classList.toggle("has-content", input.value.trim() !== "");
};

const handleSubmit = (e) => {
	e.preventDefault();
	let isFormValid = true;
	let firstInvalidInput = null;
	let allEmpty = true;

	const formData = {};

	inputs.forEach((input, i) => {
		const { isValid, errorMessage: validationErrorMessage } =
			validateInput(input);

		formData[input.name] = input.value.trim();

		if (input.value.trim() !== "") {
			allEmpty = false;
		}

		if (!isValid) {
			showError(
				input,
				errorIcons[i],
				errorMessages[i],
				validationErrorMessage,
				labels[i]
			);
			isFormValid = false;

			if (!firstInvalidInput) {
				firstInvalidInput = input;
			}
		} else {
			hideError(input, errorIcons[i], errorMessages[i], labels[i]);
		}
	});

	if (firstInvalidInput) {
		firstInvalidInput.focus();
	} else if (allEmpty) {
		inputs[0].focus;
	}

	if (isFormValid) {
		inputs.forEach((input) => {
			input.value = "";
			input.classList.remove("has-content");
		});
	}
};

const removeErrors = () => {
	inputs.forEach((input, i) => {
		if (input.value.trim().length === 0) {
			input.style.boxShadow = "";
			input.style.color = "";
			input.setAttribute("aria-invalid", "false");
			input.classList.remove("placeholder-red");
			labels[i].classList.remove("move-label");
			errorIcons[i].classList.remove("show-error-icon");
			errorMessages[i].style.color = "";
			errorMessages[i].textContent = "";
		}
	});
};

const handleInputs = () => {
	inputs.forEach((input, i) => {
		const errorIcon = errorIcons[i];
		const errorMessage = errorMessages[i];
		const label = labels[i];

		input.addEventListener("input", () => {
			removeErrors();

			handleInput(input, errorIcon, errorMessage, label);
			updateLabelPosition(input);
		});

		input.addEventListener("blur", (e) => {
			removeErrors();
		});
	});
};

export const handleRegisterSubmit = () => {
	registerForm.addEventListener("submit", handleSubmit);
	handleInputs();
};
