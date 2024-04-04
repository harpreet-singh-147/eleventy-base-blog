import { displayResponseError } from "./handleFormErrors.js";
import { loadingSpinner } from "./selectors.js";

const navItemFour = document.querySelector(".items:nth-child(4)");
const navItemFive = document.querySelector(".items:nth-child(5)");
const firstNameNavItem = document.querySelector(".first-name");
const logoutNavItem = document.querySelector(".logout");
const contactNavItem = document.querySelector(".contact");
const messagesNavItem = document.querySelector(".messages");

const messagesContainer = document.querySelector(".messages__container");

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

const handleLogout = () => {
	loadingSpinner.style.display = "flex";
	if (messagesContainer) {
		while (messagesContainer.firstChild) {
			messagesContainer.removeChild(messagesContainer.firstChild);
		}
	}

	fetch("/.netlify/functions/logout", {
		method: "POST",
		credentials: "include",
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Failed to log out");
			}
			sessionStorage.removeItem("isLoggedIn");
			setTimeout(() => {
				window.location.href = "/";
				loadingSpinner.style.display = "";
			}, 100);
		})
		.catch((error) => {
			loadingSpinner.style.display = "";
			displayResponseError(error.message);
		});
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
				if (sessionStorage.getItem("isLoggedIn") === "true") {
					handleLogout();
				}
			}
		})
		.catch((e) => {
			displayResponseError(e.message);
		});
};
