const messagesContainer = document.querySelector(".messages__container");
const messageDialog = document.querySelector(".message__dialog-messages");
const messageDialogMsg = document.querySelector(".message__dialog-messages p");
const messageDialogBtn = document.querySelector(
	".message__dialog-messages button"
);
const loadingSpinner = document.querySelector(".loading-messages");

const displayMessage = (msg) => {
	messageDialog.showModal();
	messageDialogMsg.textContent = msg;
	messageDialogBtn.addEventListener("click", () => messageDialog.close());
};

const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

loadingSpinner.style.display = "flex";

const handleUnauthorised = () => {
	loadingSpinner.style.display = "";
	window.location.href = "/";
};

if (!isLoggedIn) {
	handleUnauthorised();
} else {
	setTimeout(() => {
		fetch(
			"https://getmessages-11ty-blog-production.up.railway.app/api/messages",
			{
				credentials: "include",
			}
		)
			.then((res) => res.json())
			.then((messages) => {
				createMessageCards(messages);
			})
			.catch((err) => {
				loadingSpinner.style.display = "";
				console.log(err.message);
				displayMessage(err.message);
			});

		const createMessageCards = (messages) => {
			messages.forEach((message) => {
				const article = document.createElement("article");
				article.classList.add("card", "mb-4");

				const header = document.createElement("header");
				header.classList.add("card-header", "fs-4");
				header.textContent = `Email: ${message.email}`;

				const div = document.createElement("div");
				div.classList.add("card-body");

				const h2 = document.createElement("h2");
				h2.classList.add("card-title", "mb-2", "h4");
				h2.textContent = `From: ${message.firstName} ${message.surname}`;

				const p = document.createElement("p");
				p.classList.add("card-text", "fs-5");
				p.textContent = ` Message: ${message.message}`;

				div.append(h2, p);

				article.append(header, div);
				messagesContainer.appendChild(article);
			});
			loadingSpinner.style.display = "";
		};
	}, 500);
}
