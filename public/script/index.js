import { button } from "./selectors.js";
import { handleNavStyles } from "./navbar.js";
import { alert } from "./alert.js";
import { modal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
	const body = document.querySelector("body");
	window.addEventListener("scroll", () => {
		if (window.scrollY > 0) {
			body.classList.add("scrolled");
		} else {
			body.classList.remove("scrolled");
		}
	});

	modal();

	handleNavStyles();

	button.addEventListener("click", () => {
		alert();
	});
});
