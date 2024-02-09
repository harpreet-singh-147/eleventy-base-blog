import {
	validateInput,
	handleInput,
	hideError,
	showError,
	updateSubmitButtonState,
	showErrorForCheckbox,
	allValidInputs,
} from "./handleFormErrors.js";

const registerForm = document.querySelector("#register");
export const inputs = document.querySelectorAll(".register__form-input");
const errorIcons = document.querySelectorAll(".register__form-error-icon");
const successIcons = document.querySelectorAll(".register__form-success-icon");
const labels = document.querySelectorAll(".register__form-label");
const errorMessages = document.querySelectorAll(".register__form-error");
export const termsCheckBox = document.querySelector(".register__form-checkbox");
export const termsCheckBoxErrorMessage =
	document.querySelector("#agreeTermsError");
export const termsCheckBoxLabel = document.querySelector(
	".register__form-label-checkbox"
);
export const termsCheckBoxErrorIcon = document.querySelector(
	".register__form-error-icon-checkbox"
);
export const termsCheckBoxSuccessIcon = document.querySelector(
	".register__form-success-icon-checkbox"
);
export const registerFormBtn = document.querySelector(
	".register__form-btn-submit"
);

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
		inputs[0].focus();
	}

	if (!termsCheckBox.checked) {
		showErrorForCheckbox("You must agree to the terms to proceed.");
		isFormValid = false;
	} else {
		formData[termsCheckBox.name] = termsCheckBox.checked;
	}

	if (isFormValid) {
		allValidInputs.length = 0;
		inputs.forEach((input, i) => {
			input.value = "";
			input.classList.remove("has-content");
			input.setAttribute("aria-invalid", "false");
			successIcons[i].classList.remove("show-success-icon");
		});
		termsCheckBox.checked = false;
		registerFormBtn.classList.remove("register-success");
		termsCheckBoxSuccessIcon.classList.remove("show-success-icon-cb");
		termsCheckBox.setAttribute("aria-invalid", "false");
		console.log(formData);
	}
};

const handleCheckboxErrors = (addOrRemove) => {
	if (addOrRemove) {
		termsCheckBoxSuccessIcon.classList.add("show-success-icon-cb");
	} else {
		termsCheckBoxSuccessIcon.classList.remove("show-success-icon-cb");
	}
	termsCheckBoxErrorMessage.textContent = "";
	termsCheckBoxErrorMessage.style.color = "";
	termsCheckBoxLabel.style.color = "";
	termsCheckBoxErrorIcon.classList.remove("show-error-icon-cb");

	termsCheckBox.setAttribute("aria-invalid", "false");
};

export const removeErrors = () => {
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

	if (!termsCheckBox.checked) {
		handleCheckboxErrors(false);
	}
};

const removeCheckboxError = () => {
	if (termsCheckBox.checked) {
		handleCheckboxErrors(true);
	}
};

const handleInputs = () => {
	inputs.forEach((input, i) => {
		const errorIcon = errorIcons[i];
		const successIcon = successIcons[i];
		const errorMessage = errorMessages[i];
		const label = labels[i];

		input.addEventListener("input", () => {
			handleInput(input, errorIcon, errorMessage, successIcon, label);
			updateLabelPosition(input);
		});

		input.addEventListener("blur", (e) => {
			removeErrors();
		});
	});

	termsCheckBox.addEventListener("change", () => {
		removeErrors();
		removeCheckboxError();
		updateSubmitButtonState();
	});
};

export const handleRegisterSubmit = () => {
	if (registerForm) {
		registerForm.addEventListener("submit", handleSubmit);
		handleInputs();
	}
};
