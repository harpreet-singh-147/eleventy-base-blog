const itemForm = document.querySelector("#itemForm");
const newItemInput = document.querySelector("#itemInput");
const list = document.querySelector("#itemList");

const favouriteFoods = ["Fish and Chips", "Pizza", "Bangers and Mash"];

class ItemList {
	constructor(items) {
		this.items = items;
		this.init();
	}

	init() {
		itemForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const newItem = newItemInput.value.trim();
			if (newItem) {
				this.addItem(newItem);
				newItemInput.value = "";
			}
		});
		this.renderItems();
	}

	addItem(item) {
		this.items.unshift(item);
		this.renderItems();
	}

	removeItem(index) {
		this.items.splice(index, 1);
		this.renderItems();
	}

	renderItems() {
		while (list.firstChild) {
			list.firstChild.remove();
		}

		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			const li = document.createElement("li");
			li.textContent = item;
			li.className = "food-item";

			const removeBtn = document.createElement("button");
			removeBtn.textContent = "Delete";
			removeBtn.className = "delete-btn";
			removeBtn.onclick = () => this.removeItem(i);

			li.appendChild(removeBtn);
			list.appendChild(li);
		}
	}
}

export const handleItemListForm = () => {
	if (itemForm) {
		new ItemList(favouriteFoods);
	}
};
