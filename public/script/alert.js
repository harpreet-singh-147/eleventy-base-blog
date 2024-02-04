import { container } from "./selectors.js";

export const alert = () => {
	const div = document.createElement("div");
	div.classList.add("alert", "alert-primary", "alert-dismissible");
	div.setAttribute("role", "alert");
	div.textContent = "Alert with close button";

	const button = document.createElement("button");
	button.setAttribute("type", "button");
	button.classList.add("btn-close");
	button.setAttribute("data-bs-dismiss", "alert");
	button.setAttribute("aria-label", "Close");
	div.appendChild(button);

	container.appendChild(div);
};
