import { displayMessage } from "./utils.js";
import { displayResponseError } from "./handleFormErrors.js";
import { loadingSpinner, messageDialog } from "./selectors.js";

const contactForm = document.querySelector(".contact-form");
const inputs = document.querySelectorAll(".contact-input");
const messageTextarea = document.querySelector("#message");
const charCount = document.querySelector("#charCount");
const termsContainer = document.querySelector(".checkbox-container");
const terms = document.querySelector("#terms");

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

const updateCheckboxValidationState = (el, container, isValid, uncheck) => {
	el.setAttribute("aria-invalid", isValid ? "false" : "true");

	if (isValid) {
		container.classList.remove("was-validated");
	} else {
		container.classList.add("was-validated");
	}

	if (uncheck) {
		terms.checked = false;
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

	if (terms.checkValidity()) {
		formData[terms.name] = terms.value;
	} else {
		updateCheckboxValidationState(terms, termsContainer, false);
		isFormValid = false;
	}

	if (firstInvalidInput) {
		firstInvalidInput.focus();
	}

	if (isFormValid) {
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
				updateValidationState(messageTextarea, "neutral");
				updateCheckboxValidationState(terms, termsContainer, true, true);
				firstInvalidInput = null;
				messageTextarea.value = "";
				charCount.textContent = "150 characters left";
				charCount.classList.remove("char-count-add-right");
				loadingSpinner.style.display = "";
				displayMessage("Thank you for your message!");
				// setTimeout(() => {
				// 	messageDialog.close();
				// 	window.location.href = "/";
				// }, 3000);
				// console.log(data);
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
	if (!terms.checked && termsContainer.classList.contains("was-validated")) {
		updateCheckboxValidationState(terms, termsContainer, true);
	}
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

const handleTerms = () => {
	if (terms.checked) {
		termsContainer.classList.add("was-validated");
		terms.setAttribute("aria-invalid", "false");
	} else {
		termsContainer.classList.remove("was-validated");
		terms.setAttribute("aria-invalid", "false");
	}
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
		terms.addEventListener("change", () => handleTerms());
		addInputListeners();
	}
};
