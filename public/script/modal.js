import { modalBtns, loadingSpinner } from "./selectors.js";

const handleOpenModal = (title, body, id, type) => {
	return `
		<div class="modal fade" id=${id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-scrollable ${type} h-auto">
				<div class="modal-content ">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body d-flex gap-2 flex-wrap justify-content-center">
						${body}
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	`;
};

const generateModalId = () => {
	const modalId = Date.now() + Math.random().toString(36).slice(2, 9);
	return `modal-${modalId}`;
};

const getWeather = (data) => {
	return `
        <div class="text-center">
            <p>Weather in ${data.name} ${data.sys.country} today!</p>
            <p>Temp: ${data.main.temp}&deg;C</p>
            <p class="text-capitalize">${data.weather[0].description}</p>
        </div>

    `;
};

const getDogPic = (data) => {
	return `
        <div class="card" style="width: 18rem;">
            <img src="${data.message}" class="card-img-top" alt="A random dog picture">
        </div>
    `;
};

const getNasaCards = (data) => {
	return data
		.map(({ url, title, explanation, copyright = "unknown" }) => {
			return `<div class="card" style="width: 18rem;">
                        <img src="${url}" class="card-img-top" alt="${title}">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${explanation}</p>
                            <p class="card-text">Copyright: <span class="text-capitalize">${copyright}</span></p>
                        </div>
                    </div>`;
		})
		.join("");
};

const getQuotes = (data) => {
	const { quoteAuthor, quoteText } = data.data[Math.floor(Math.random() * 10)];
	return `
        <div class="d-flex flex-column justify-content-center">
            <p class="text-center">${quoteText}</p>
            <p class="text-center"><strong>${quoteAuthor}</strong></p>
        </div>
    `;
};

const buttonToDataMap = {
	"open-modal-1": "/.netlify/functions/weatherApi",
	"open-modal-2": "https://dog.ceo/api/breeds/image/random",
	"open-modal-3":
		"https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5",
	"open-modal-4": "https://quote-garden.onrender.com/api/v3/quotes",
};

const modalData = {
	"open-modal-1": getWeather,
	"open-modal-2": getDogPic,
	"open-modal-3": getNasaCards,
	"open-modal-4": getQuotes,
};

const showError = (message) => {
	const existingAlert = document.querySelector("#error-message");
	if (existingAlert) {
		existingAlert.remove();
	}

	const backdrop = document.createElement("div");
	backdrop.classList.add("error-backdrop");
	document.body.appendChild(backdrop);

	const alert = document.createElement("div");
	alert.id = "error-message";
	alert.classList.add(
		"alert",
		"alert-danger",
		"center-error",
		"alert-dismissible",
		"fade",
		"show",
		"larger-alert"
	);
	alert.setAttribute("role", "alert");

	const alertText = document.createTextNode(message);
	alert.appendChild(alertText);

	const closeButton = document.createElement("button");
	closeButton.type = "button";
	closeButton.classList.add("btn-close", "btn-close-custom");
	closeButton.setAttribute("data-bs-dismiss", "alert");
	closeButton.setAttribute("aria-label", "Close");
	closeButton.onclick = () => backdrop.remove();
	alert.appendChild(closeButton);

	document.body.appendChild(alert);
};

export const modal = () => {
	modalBtns.forEach((btn) => {
		btn.addEventListener("click", async () => {
			loadingSpinner.style.display = "flex";
			const functionToCall = modalData[btn.id];
			const title = btn.getAttribute("data-title");
			let body;

			try {
				const data = await fetch(buttonToDataMap[btn.id]).then((res) =>
					res.json()
				);
				body = functionToCall(data);
				loadingSpinner.style.display = "";
			} catch (err) {
				console.error(err);
				showError("Sorry, there was an error. Please try again later.");
				loadingSpinner.style.display = "";
				return;
			}

			if (body) {
				const id = generateModalId();
				const type = btn.getAttribute("data-type") || "";
				const modalHTML = handleOpenModal(title, body, id, type);
				document.body.insertAdjacentHTML("beforeend", modalHTML);
				const myModal = new bootstrap.Modal(document.getElementById(id));
				myModal.show();
			}
		});
	});
};
