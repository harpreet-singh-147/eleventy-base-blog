import { displayResponseError } from "./handleFormErrors.js";
import { loadingSpinner } from "./selectors.js";

const contactForm = document.querySelector(".contact-form");
const inputs = document.querySelectorAll(".contact-input");
const messageTextarea = document.querySelector("#message");
const charCount = document.querySelector("#charCount");

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

const handleSubmit = (e) => {
	e.preventDefault();
	const formData = {};
	let isFormValid = true;
	let firstInvalidInput = null;

	inputs.forEach((input) => {
		const isInputValid = input.checkValidity();

		if (isInputValid) {
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

	if (messageTextarea.checkValidity()) {
		updateValidationState(messageTextarea, "valid");
		charCount.classList.add("char-count-add-right");
		formData[messageTextarea.name] = messageTextarea.value;
	} else {
		updateValidationState(messageTextarea, "invalid");
		charCount.classList.add("char-count-add-right");
		isFormValid = false;
		if (!firstInvalidInput) {
			firstInvalidInput = messageTextarea;
		}
	}

	if (firstInvalidInput) {
		firstInvalidInput.focus();
	}

	if (isFormValid) {
		console.log(formData);
		loadingSpinner.style.display = "flex";
		fetch("/.netlify/functions/contactFormHandler", {
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
				messageTextarea.value = "";
				updateValidationState(messageTextarea, "neutral");
				isFormValid = true;
				firstInvalidInput = null;
				// window.location.href = "/";
				console.log(data);
				loadingSpinner.style.display = "";
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
		if (input.name === "firstName" || input.name === "surname") {
			if (input.value.trim().length > 0) {
				updateValidationState(input, "valid");
			} else {
				updateValidationState(input, "neutral");
			}
		}

		if (input.name === "email") {
			if (input.value.trim().length === 0) {
				updateValidationState(input, "neutral");
			} else if (!input.checkValidity()) {
				updateValidationState(input, "invalid");
			} else {
				updateValidationState(input, "valid");
			}
		}
	});
	handleTextareaChange();
};

const handleTextareaChange = () => {
	if (messageTextarea.value.trim().length === 0) {
		updateValidationState(messageTextarea, "neutral");
		charCount.classList.remove("char-count-add-right");
	} else if (!messageTextarea.checkValidity()) {
		updateValidationState(messageTextarea, "invalid");
		charCount.classList.add("char-count-add-right");
	} else {
		updateValidationState(messageTextarea, "valid");
		charCount.classList.add("char-count-add-right");
	}
};

const handleTextArea = () => {
	const maxLength = +messageTextarea.getAttribute("maxLength");
	const currentLength = messageTextarea.value.length;
	const charsLeft = maxLength - currentLength;
	charCount.textContent = `${charsLeft} characters left`;
	messageTextarea.style.height = messageTextarea.scrollHeight + "px";
};

const addInputListeners = () => {
	inputs.forEach((input) => {
		input.addEventListener("input", () => handleInputChange());
		input.addEventListener("blur", () => handleInputChange());
	});
	messageTextarea.addEventListener("input", () => handleTextareaChange());
	messageTextarea.addEventListener("blur", () => handleTextareaChange());
};

export const handleContactMe = () => {
	if (contactForm) {
		contactForm.addEventListener("submit", handleSubmit);
		messageTextarea.addEventListener("input", () => handleTextArea());
		addInputListeners();
	}
};
