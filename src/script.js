document.addEventListener("DOMContentLoaded", loadTodos);
document
  .getElementById("addTodoBtn")
  .addEventListener("click", () => addTodo());

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    addTodo(todo.text, todo.completed);
  });
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll(".todo-item").forEach((item) => {
    const text = item.querySelector(".todo-text").innerText;
    const completed = item.querySelector('input[type="checkbox"]').checked;
    todos.push({ text, completed });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(text = "새 할 일", completed = false) {
  const todoList = document.getElementById("todoList");
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", toggleTodo);

  const todoText = document.createElement("span");
  todoText.classList.add("todo-text");
  todoText.contentEditable = false;
  todoText.innerText = text;
  if (completed) {
    todoText.classList.add("completed");
  }

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.classList.add("edit-input");
  editInput.value = text;

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = "✏️";
  editBtn.addEventListener("click", () =>
    editTodo(todoText, editInput, editBtn)
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.addEventListener("click", () => {
    todoItem.remove();
    saveTodos();
  });

  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(editInput);
  todoItem.appendChild(editBtn);
  todoItem.appendChild(deleteBtn);
  todoList.appendChild(todoItem);

  saveTodos();
}

function toggleTodo(event) {
  const todoText = event.target.nextSibling;
  if (event.target.checked) {
    todoText.classList.add("completed");
  } else {
    todoText.classList.remove("completed");
  }
  saveTodos();
}

function editTodo(todoText, editInput, editBtn) {
  const isEditing = editInput.style.display === "block";
  if (isEditing) {
    todoText.innerText = editInput.value.substring(0, 30);
    editInput.style.display = "none";
    todoText.style.display = "block";
    editBtn.innerHTML = "✏️";
    saveTodos();
  } else {
    editInput.value = todoText.innerText;
    editInput.style.display = "block";
    todoText.style.display = "none";
    editBtn.innerHTML = "💾";
  }
}
