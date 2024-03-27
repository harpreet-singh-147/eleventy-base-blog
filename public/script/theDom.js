const priorityImages = {
	low: "https://cdn1.iconfinder.com/data/icons/prettyoffice8/256/Flag-green.png",
	medium:
		"https://cdn1.iconfinder.com/data/icons/prettyoffice8/256/Flag-yellow.png",
	high: "https://cdn1.iconfinder.com/data/icons/prettyoffice8/256/Flag-red.png",
};

const form = document.getElementById("todo");
const todoPane = document.getElementById("todo-pane");
const titleInput = document.getElementById("title");
const prioritySelect = document.getElementById("priority");

const createTodo = (title, priority) => {
	const textNode = document.createTextNode(title);
	const li = document.createElement("li");
	li.setAttribute(
		"aria-label",
		`Todo item: ${title} with ${priority} priority. Click to delete.`
	);

	const img = document.createElement("img");
	img.src = priorityImages[priority];
	img.alt = `Icon of ${priority} priority`;

	li.append(textNode, img);
	li.classList.add("todo", "just-created");
	li.addEventListener("click", (e) => e.currentTarget.remove());

	return li;
};

const handleSubmit = (e) => {
	e.preventDefault();
	const todos = document.querySelectorAll(".todo");
	if (todos) {
		todos.forEach((todo) => todo.classList.remove("just-created"));
	}

	const newTodo = createTodo(titleInput.value, prioritySelect.value);
	todoPane.appendChild(newTodo);
	titleInput.value = "";
};

export const handleTodoForm = () => {
	if (form) {
		form.addEventListener("submit", handleSubmit);
	}
};
