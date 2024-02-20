const homePageModalContactForm = document.querySelector("#homeContactForm");
const firstInputContactForm = document.querySelector(
	".contact-form #firstName"
);

export const handleHomePageModalContactForm = () => {
	if (homePageModalContactForm) {
		homePageModalContactForm.addEventListener("shown.bs.modal", () => {
			firstInputContactForm.focus();
		});
	}
};
