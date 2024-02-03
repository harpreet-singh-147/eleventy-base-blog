document.addEventListener("DOMContentLoaded", function () {
	const body = document.querySelector("body");
	const offcanvasElement = document.getElementById("offcanvasNavbar");
	const aside = document.querySelector(".aside");

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
});
