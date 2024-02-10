const loginForm = document.querySelector(".login-form");
const inputs = document.querySelectorAll("input");
const eyeIconBtn = document.querySelector(".eye-icon-btn");
const eyeIcon = document.querySelector("#togglePasswordVisibility");
const passwordInput = document.querySelector("#password");

const updateValidationState = (input, state) => {
	input.classList.remove("is-valid", "is-invalid");

	switch (state) {
		case "valid":
			input.classList.add("is-valid");
			input.setAttribute("aria-invalid", "false");
			break;
		case "invalid":
			input.classList.add("is-invalid");
			input.setAttribute("aria-invalid", "true");
			break;
		case "neutral":
		default:
			input.setAttribute("aria-invalid", "false");
			break;
	}
};

const resetEyeIcon = () => {
	eyeIconBtn.setAttribute("aria-label", "Show password");
	eyeIconBtn.setAttribute("title", "Show password");
	eyeIcon.classList.remove("bi-eye", "bi-eye-slash");
	passwordInput.setAttribute("type", "password");
	eyeIcon.classList.add("bi-eye-slash");
};

const handleSubmit = (e) => {
	e.preventDefault();
	const formData = {};
	let isFormValid = true;
	let firstInvalidInput = null;

	inputs.forEach((input) => {
		const isInputValid = input.checkValidity();
		const isLengthValid = input.value.trim().length >= 8;

		if (isInputValid && isLengthValid) {
			updateValidationState(input, "valid");
			formData[input.name] = input.value;
		} else {
			updateValidationState(input, "invalid");
			isFormValid = false;
			if (!firstInvalidInput) {
				firstInvalidInput = input;
			}
		}
	});

	if (firstInvalidInput) {
		firstInvalidInput.focus();
	}

	if (isFormValid) {
		inputs.forEach((input) => {
			input.value = "";
			updateValidationState(input, "neutral");
			isFormValid = true;
		});
		resetEyeIcon();
		console.log(formData);
	}
};

const handleInputChange = () => {
	inputs.forEach((input) => {
		if (input.value.trim().length > 0 && input.value.trim().length < 8) {
			updateValidationState(input, "invalid");
		} else if (input.value.trim().length >= 8) {
			updateValidationState(input, "valid");
		} else {
			updateValidationState(input, "neutral");
		}
	});
};

const addInputListeners = () => {
	inputs.forEach((input) => {
		input.addEventListener("input", () => handleInputChange());

		input.addEventListener("blur", () => handleInputChange());
	});
};

const toggleEyeIcon = () => {
	const type =
		passwordInput.getAttribute("type") === "password" ? "text" : "password";
	const toggleAriaLabel =
		eyeIconBtn.getAttribute("aria-label") === "Show password"
			? "Hide password"
			: "Show password";
	passwordInput.setAttribute("type", type);
	eyeIconBtn.setAttribute("aria-label", toggleAriaLabel);
	eyeIconBtn.setAttribute("title", toggleAriaLabel);
	eyeIcon.classList.toggle("bi-eye");
	eyeIcon.classList.toggle("bi-eye-slash");
};

export const handleLogin = () => {
	if (loginForm) {
		loginForm.addEventListener("submit", handleSubmit);
		eyeIconBtn.addEventListener("click", toggleEyeIcon);
		addInputListeners();
	}
};
