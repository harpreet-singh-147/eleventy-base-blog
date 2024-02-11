import { displayResponseError } from "./handleFormErrors.js";

const navItems = document.querySelectorAll(".nav-item.items");
const firstNameNavItem = document.querySelector(".nav-item.first-name");
const logoutNavItem = document.querySelector(".nav-item.logout");

export const handleAuthUi = () => {
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
				navItems.forEach((navItem, i) => {
					if (i === 2 || i === 3) {
						navItem.style.display = "";
					}
				});
				firstNameNavItem.style.display = "none";
				logoutNavItem.style.display = "none";
				return;
			} else {
				console.log(data);
				navItems.forEach((navItem, i) => {
					if (i === 2 || i === 3) {
						navItem.style.display = "none";
					}
				});
				firstNameNavItem.style.display = "block";
				firstNameNavItem.children[0].textContent = `Hello ${data.user.firstName}`;
				logoutNavItem.style.display = "block";
			}
		})
		.catch((error) => {
			displayResponseError(error.message);
		});
};
