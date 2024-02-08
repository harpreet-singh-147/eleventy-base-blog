const mapAndCapitalise = (camelCase) => {
	return camelCase
		.split(/(?=[A-Z])/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
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

export const handleInput = (input, errorIcon, errorMessage, label) => {
	const { isValid, errorMessage: validationErrorMessage } =
		validateInput(input);

	if (isValid || input.value.trim().length === 0) {
		hideError(input, errorIcon, errorMessage, label);
	} else {
		showError(input, errorIcon, errorMessage, validationErrorMessage, label);
	}
};
