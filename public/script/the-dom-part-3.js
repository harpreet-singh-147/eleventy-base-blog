const animalForm = document.querySelector(".animal-form");
const animalRadios = document.querySelectorAll(
	'.animal-form input[name="animalName"]'
);
const images = document.querySelectorAll(".imageFilter");
const searchInput = document.querySelector("#searchAnimals");
const filterTextElement = document.querySelector(".animal__filter-text");
const noResultText = document.querySelector(".animal__no-result");

const showHelperText = (searchTerm, selectedAnimal) => {
	let filterText = "Showing all animals";
	if (searchTerm && selectedAnimal !== "all") {
		filterText += ` that match the search "${searchTerm}" and the filter ${selectedAnimal}`;
	} else if (searchTerm) {
		filterText += ` that match the search "${searchTerm}"`;
	} else if (selectedAnimal !== "all") {
		filterText += ` with the filter ${selectedAnimal}`;
	}

	return filterText;
};

const showNoResultText = (imagesCount) => {
	if (imagesCount === 0) {
		noResultText.style.display = "block";
	} else {
		noResultText.style.display = "";
	}
};

const filterAnimals = () => {
	const searchTerm = searchInput.value.trim().toLowerCase();
	const selectedAnimal = document.querySelector(
		'.animal-form input[name="animalName"]:checked'
	).value;

	let imagesCount = 0;

	filterTextElement.textContent = showHelperText(searchTerm, selectedAnimal);

	images.forEach((img) => {
		const altText = img.alt.toLowerCase();
		const searchTerms = searchTerm.split(" ");
		const searchMatch = searchTerms.every((term) => altText.includes(term));

		const animalMatch =
			selectedAnimal === "all" || img.dataset.animal === selectedAnimal;

		if (searchMatch && animalMatch) {
			img.classList.add("hidden");
			setTimeout(() => {
				img.classList.remove("hidden");
			}, 50);
			imagesCount++;
		} else {
			img.classList.add("hidden");
		}
	});

	showNoResultText(imagesCount);
};

export const handleAnimalFilter = () => {
	if (animalForm) {
		animalForm.addEventListener("submit", (e) => e.preventDefault());
		animalRadios.forEach((radio) =>
			radio.addEventListener("change", filterAnimals)
		);
		searchInput.addEventListener("keyup", () => {
			if (!searchInput.value.trim()) {
				return;
			}
			filterAnimals();
		});

		searchInput.addEventListener("input", () => {
			if (!searchInput.value) {
				filterAnimals();
				return;
			}
		});
	}
};
