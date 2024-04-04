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

export const displayMessageCb = (msg, closeCallback) => {
	messageDialog.showModal();
	messageDialogMsg.textContent = msg;

	if (closeCallback && typeof closeCallback === "function") {
		closeCallback(() => messageDialog.close());
	}
};
