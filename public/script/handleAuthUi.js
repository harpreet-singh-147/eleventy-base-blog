import { displayResponseError } from "./handleFormErrors.js";

const navItemFour = document.querySelector(".items:nth-child(4)");
const navItemFive = document.querySelector(".items:nth-child(5)");
const firstNameNavItem = document.querySelector(".first-name");
const logoutNavItem = document.querySelector(".logout");
const contactNavItem = document.querySelector(".contact");
const messagesNavItem = document.querySelector(".messages");

const adjustUiForAuthenticatedUser = (firstName = "") => {
	navItemFour.classList.add("hide-nav-item");
	navItemFive.classList.add("hide-nav-item");
	contactNavItem.classList.add("hide-nav-item");
	firstNameNavItem.style.display = "block";
	if (firstName) {
		firstNameNavItem.children[0].textContent = `Hello ${firstName}`;
	}
	messagesNavItem.style.display = "block";
	logoutNavItem.style.display = "block";
};

const adjustUiForGuestUser = () => {
	navItemFour.classList.remove("hide-nav-item");
	navItemFive.classList.remove("hide-nav-item");
	contactNavItem.classList.remove("hide-nav-item");
	firstNameNavItem.style.display = "";
	messagesNavItem.style.display = "";
	logoutNavItem.style.display = "";
};

export const handleAuthUi = () => {
	fetch("/.netlify/functions/authStatus", {
		credentials: "include",
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("An unknown error occurred");
			}
			return response.json();
		})
		.then((data) => {
			if (data.authenticated) {
				adjustUiForAuthenticatedUser(data.user.firstName);

				return;
			} else {
				adjustUiForGuestUser();
			}
		})
		.catch((error) => {
			displayResponseError(error.message);
		});
};
