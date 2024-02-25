const drinksForm = document.querySelector(".drinks__form");
const radioInputs = document.querySelectorAll(".drinks-radio-btn");
const drinkCombo = document.querySelector("#drinkCombo");
const reset = document.querySelector(".drinks__form-reset");
const drinkSizeCheckIcon = document.querySelector(".drink-size-icon");
const drinkCheckIcon = document.querySelector(".drink-icon");

let selectedSize = null;
let selectedDrink = null;

const drinkOrder = (size, drink) => {
	let requestedDrink = "";

	switch (drink) {
		case "cola":
			requestedDrink = "cola";
			break;
		case "lemon":
			requestedDrink = "lemonade";
			break;
		case "orange":
			requestedDrink = "orangeade";
			break;
		default:
			return "drink not found";
	}

	return `You ordered a ${size} ${requestedDrink}`;
};

const handleChange = (e) => {
	const fieldset = e.target.closest("fieldset");
	const feedbackContainer = fieldset.querySelector(".valid-feedback");
	const radioContainer = fieldset.querySelector(
		".drinks__form-radio-container"
	);
	let textContent;

	if (e.target.name === "size") {
		selectedSize = e.target.value;
		drinkSizeCheckIcon.style.display = "block";
		textContent = `Selected size: ${e.target.value}`;
	} else {
		selectedDrink = e.target.value;
		drinkCheckIcon.style.display = "block";
		textContent = `Selected drink: ${e.target.value}`;
	}

	if (feedbackContainer) {
		feedbackContainer.textContent = textContent;
		feedbackContainer.classList.add("text-capitalize");
		radioContainer.classList.add("is-valid");
	}

	if (selectedSize && selectedDrink) {
		drinkCombo.value = drinkOrder(selectedSize, selectedDrink);
		drinkCombo.classList.add("is-valid");
	}
};

const handleClick = () => {
	radioInputs.forEach((radioInput) => {
		const fieldset = radioInput.closest("fieldset");

		const feedbackContainer = fieldset.querySelector(".valid-feedback");
		feedbackContainer.textContent = "";
		feedbackContainer.classList.remove("text-capitalize");

		const radioContainer = fieldset.querySelector(
			".drinks__form-radio-container"
		);
		radioContainer.classList.remove("is-valid");

		radioInput.checked = false;
	});
	drinkCombo.classList.remove("is-valid");
	drinkCombo.value = "";
	selectedSize = null;
	selectedDrink = null;
	drinkSizeCheckIcon.style.display = "";
	drinkCheckIcon.style.display = "";
};

export const handleDrinksForm = () => {
	if (drinksForm) {
		radioInputs.forEach((radioInput) =>
			radioInput.addEventListener("change", handleChange)
		);

		reset.addEventListener("click", handleClick);
	}
};
