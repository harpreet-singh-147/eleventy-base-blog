import { modalBtns } from "./selectors.js";

const handleOpenModal = (title, body, id, type) => {
	return `
		<div class="modal fade" id=${id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-scrollable ${type}">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
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

const buttonToDataMap = {
	"open-modal-1": "/.netlify/functions/weatherApi",
	"open-modal-2": "/modalContentOne.json",
	"open-modal-3": "/modalContentTwo.json",
	"open-modal-4": "/modalContentThree.json",
};

const getModalContent = (data, btn) => {
	// console.log(openWeatherApiKey);
	// console.log(btn);
	return `

        <div>
            <p>${data.title}</p>
            ${data.body}
        </div>
    
    
    `;
};

export const modal = () => {
	modalBtns.forEach((btn, i) => {
		btn.addEventListener("click", async () => {
			const title = btn.getAttribute("data-title") || "Hi. This is a modal!";
			const body =
				(await fetch(buttonToDataMap[btn.id])
					.then((res) => res.json())
					.then((data) => getModalContent(data, btn))) || "That has no content";
			const id = generateModalId();
			const type = btn.getAttribute("data-type") || "";
			const modalHTML = handleOpenModal(title, body, id, type);
			document.body.insertAdjacentHTML("beforeend", modalHTML);
			const myModal = new bootstrap.Modal(document.getElementById(id));
			myModal.show();
		});
	});
};
