import { handleAuthUi } from "./handleAuthUi.js";
import { body } from "./selectors.js";
import { handleRegisterSubmit } from "./registerAccount.js";
import { handleLogin } from "./handleLogin.js";
import { handleContactMe } from "./handleContactMe.js";
import { handleLogoutClick } from "./handleLogout.js";
import { handleTipCalculator } from "./tipCalculator.js";
import { handleHomePageModalContactForm } from "./homePageContactModal.js";
import { handlePercentageCalculator } from "./percentageForm.js";
import { handleDrinksForm } from "./drinkOrder.js";
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
	handleContactMe();
	handleLogoutClick();
	handleTipCalculator();
	handleHomePageModalContactForm();
	handlePercentageCalculator();
	handleDrinksForm();
});
