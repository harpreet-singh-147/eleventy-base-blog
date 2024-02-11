import { displayResponseError } from "./handleFormErrors.js";

const navItemFour = document.querySelector(".items:nth-child(4)");
const navItemFive = document.querySelector(".items:nth-child(5)");
const firstNameNavItem = document.querySelector(".first-name");
const logoutNavItem = document.querySelector(".logout");

const adjustUiForAuthenticatedUser = (firstName = "") => {
	navItemFour.classList.add("hide-nav-item");
	navItemFive.classList.add("hide-nav-item");
	firstNameNavItem.style.display = "block";
	if (firstName) {
		firstNameNavItem.children[0].textContent = `Hello ${firstName}`;
	}
	logoutNavItem.style.display = "block";
};

const adjustUiForGuestUser = () => {
	navItemFour.classList.remove("hide-nav-item");
	navItemFive.classList.remove("hide-nav-item");
	firstNameNavItem.style.display = "none";
	logoutNavItem.style.display = "none";
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
				console.log(data);
				adjustUiForGuestUser();
			}
		})
		.catch((error) => {
			displayResponseError(error.message);
		});
};
