import {
	inputs,
	registerFormBtn,
	removeErrors,
	termsCheckBox,
	termsCheckBoxErrorMessage,
	termsCheckBoxLabel,
	termsCheckBoxErrorIcon,
} from "./registerAccount.js";

export const allValidInputs = [];

export const updateSubmitButtonState = () => {
	const allInputsValid =
		inputs.length === allValidInputs.length && termsCheckBox.checked;
	if (allInputsValid) {
		registerFormBtn.classList.add("register-success");
	} else {
		registerFormBtn.classList.remove("register-success");
	}
};

const mapAndCapitalise = (camelCase) => {
	return camelCase
		.split(/(?=[A-Z])/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

export const showErrorForCheckbox = (errMsg) => {
	termsCheckBox.setAttribute("aria-invalid", "true");
	termsCheckBoxErrorMessage.textContent = errMsg;
	termsCheckBoxErrorMessage.style.color = "#FF7979";
	termsCheckBoxLabel.style.color = "#FF7979";
	termsCheckBoxErrorIcon.classList.add("show-error-icon-cb");
};

export const validateInput = (input) => {
	const type = input.getAttribute("type");
	const value = input.value.trim();
	let isValid = true;
	let errorMessage = "";

	if (!value) {
		isValid = false;
		errorMessage = `${mapAndCapitalise(input.name)} cannot be empty`;
	}

	if (type === "text" && input.id === "firstName") {
		if (value.length < 3) {
			isValid = false;
			errorMessage = "First name must be at least 3 characters long";
		}
	}

	if (type === "text" && input.id === "username") {
		if (value.length < 8) {
			isValid = false;
			errorMessage = "Username must be at least 8 characters long";
		}
	}

	if (type === "password" && value) {
		if (value.length < 8) {
			isValid = false;
			errorMessage = "Password must be at least 8 characters long";
		}
	}

	return { isValid, errorMessage };
};

export const hideError = (input, errorIcon, errorMessage, label) => {
	input.style.boxShadow = "";
	input.style.color = "";
	input.setAttribute("aria-invalid", "false");
	input.classList.remove("placeholder-red");
	errorIcon.classList.remove("show-error-icon");
	label.style.color = "";
	errorMessage.style.color = "";
	errorMessage.textContent = "";
};

export const showError = (
	input,
	errorIcon,
	errorMessage,
	validationErrorMessage,
	label
) => {
	input.style.boxShadow = "0 0 2px 2px #FF7979";
	input.style.color = "#FF7979";
	input.setAttribute("aria-invalid", "true");
	input.classList.add("placeholder-red");
	errorIcon.classList.add("show-error-icon");
	errorMessage.textContent = validationErrorMessage;
	errorMessage.style.color = "#FF7979";
	label.style.color = "#FF7979";
};

export const handleInput = (
	input,
	errorIcon,
	errorMessage,
	successIcon,
	label
) => {
	const { isValid, errorMessage: validationErrorMessage } =
		validateInput(input);

	if (input.value.trim().length === 0) {
		const index = allValidInputs.indexOf(input);
		if (index > -1) {
			allValidInputs.splice(index, 1);
		}
		hideError(input, errorIcon, errorMessage, label);
		successIcon.classList.remove("show-success-icon");
		removeErrors();
		updateSubmitButtonState();
		return;
	}

	if (isValid) {
		if (!allValidInputs.includes(input)) {
			allValidInputs.push(input);
		}
		hideError(input, errorIcon, errorMessage, label);
		successIcon.classList.add("show-success-icon");
	} else {
		const index = allValidInputs.indexOf(input);
		if (index > -1) {
			allValidInputs.splice(index, 1);
		}
		showError(
			input,
			errorIcon,
			errorMessage,
			validationErrorMessage,
			label,
			successIcon
		);
		successIcon.classList.remove("show-success-icon");
	}
	updateSubmitButtonState();
};
