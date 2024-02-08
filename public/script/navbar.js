import { offcanvasElement, aside, body } from "./selectors.js";

export const handleNavStyles = () => {
	offcanvasElement.addEventListener("show.bs.offcanvas", () => {
		body.setAttribute("disabled", "true");
		aside.style.zIndex = "-5";
	});

	offcanvasElement.addEventListener("hidden.bs.offcanvas", () => {
		body.removeAttribute("disabled");
		aside.style.zIndex = "";
	});
};
