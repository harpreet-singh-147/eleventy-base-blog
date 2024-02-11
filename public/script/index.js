import { displayResponseError } from "./handleFormErrors.js";
import { button, body } from "./selectors.js";
import { handleNavStyles } from "./navbar.js";
import { handleRegisterSubmit } from "./registerAccount.js";
import { handleLogin } from "./handleLogin.js";
import { alert } from "./alert.js";
import { modal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
	window.addEventListener("scroll", () => {
		if (window.scrollY > 0) {
			body.classList.add("scrolled");
		} else {
			body.classList.remove("scrolled");
		}
	});

	modal();

	handleNavStyles();

	handleRegisterSubmit();
	handleLogin();

	if (button) {
		button.addEventListener("click", () => {
			alert();
		});
	}
});

document.addEventListener("DOMContentLoaded", () => {
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
			if (!data.authenticated) {
				console.log("not authenticated");
				return;
			} else {
				console.log(data);
				console.log("User is authenticated");
			}
		})
		.catch((error) => {
			console.error(error.message);
			displayResponseError(error.message);
		});
});
