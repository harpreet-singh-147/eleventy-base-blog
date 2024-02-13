import { displayResponseError } from "./handleFormErrors.js";
import { loadingSpinner } from "./selectors.js";

const loginForm = document.querySelector(".login-form");
const inputs = document.querySelectorAll(".login-input");
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
		loadingSpinner.style.display = "flex";
		fetch("/.netlify/functions/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then(async (response) => {
				if (!response.ok) {
					const data = await response.json();
					throw new Error(data.message || "An unknown error occurred");
				}
				return response.json();
			})
			.then((data) => {
				inputs.forEach((input) => {
					input.value = "";
					updateValidationState(input, "neutral");
				});
				isFormValid = true;
				resetEyeIcon();
				sessionStorage.setItem("isLoggedIn", "true");
				loadingSpinner.style.display = "";
				window.location.href = "/";
			})
			.catch((error) => {
				loadingSpinner.style.display = "";
				displayResponseError(error.message);
				console.error("Error:", error);
			});
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
