import {
	messageDialog,
	messageDialogMsg,
	messageDialogBtn,
} from "./selectors.js";

export const displayMessage = (msg) => {
	messageDialog.showModal();
	messageDialogMsg.textContent = msg;
	messageDialogBtn.addEventListener("click", () => messageDialog.close());
};
