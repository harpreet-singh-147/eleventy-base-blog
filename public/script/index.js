import { handleAuthUi } from "./handleAuthUi.js";
import { button, body } from "./selectors.js";
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

	handleAuthUi();

	handleRegisterSubmit();
	handleLogin();

	if (button) {
		button.addEventListener("click", () => {
			alert();
		});
	}
});
