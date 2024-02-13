import { loadingSpinner } from "./selectors.js";
import { displayResponseError } from "./handleFormErrors.js";

const logoutNavItem = document.querySelector(".logout");
const messagesContainer = document.querySelector(".messages__container");

const handleLogout = (e) => {
	e.preventDefault();
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

export const handleLogoutClick = () => {
	if (logoutNavItem) {
		logoutNavItem.addEventListener("click", handleLogout);
	}
};
