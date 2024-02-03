document.addEventListener("DOMContentLoaded", function () {
	const body = document.querySelector("body");
	const offcanvasElement = document.getElementById("offcanvasNavbar");
	const aside = document.querySelector(".aside");

	const button = document.getElementById("alert-btn");
	const container = document.getElementById("alert-container");

	window.addEventListener("scroll", () => {
		if (window.scrollY > 0) {
			body.classList.add("scrolled");
		} else {
			body.classList.remove("scrolled");
		}
	});

	offcanvasElement.addEventListener("show.bs.offcanvas", () => {
		body.setAttribute("disabled", "true");
		aside.style.zIndex = "-5";
	});

	offcanvasElement.addEventListener("hidden.bs.offcanvas", () => {
		body.removeAttribute("disabled");
		aside.style.zIndex = "";
	});

	button.addEventListener("click", () => {
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
	});
});
