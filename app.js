// Mengumpulkan semua UI element

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

innediateLoadEventListener();

function innediateLoadEventListener(){

	// Membuat todos dari localStorage dan render di browser
	document.addEventListener("DOMContentLoaded", getTodos);

	// Membuat fungsionalitas form penambahan todo
	todoForm.addEventListener("submit", addTodo); // Tipe menggunakan submit sesuai dengan type button form di html dan addTodo merupakan function trigger dari setelah sumbit di klik

	//Membuat fungsionalitas penghapusan element todo
	todoList.addEventListener("click", deleteTodo); // Tipe menggunakan click pada saat listener men click di area element tersebut maka hanya element tersebut lah yang akan di eksekusi

	// Membuat fungsionalitas menghapus semua element list todo
	clearButton.addEventListener("click", clearTodos);

	// Membuat fungsionalitas ketika user mengetikan sesuatu akan mentriger sebuah aksi
	filterInput.addEventListener("keyup", filterTodos);

}


// reusable code
function createTodoElement(value) {
	// Membuat li element
	const li = document.createElement("li");

	// Menambahkan class pada element li
	li.className = "todo-item list-group-item d-flex justify-content-between align-items-center mb-1"

	// Menambahkan chil pada element li
	li.appendChild(document.createTextNode(value));

	// Membuat a element
	const a = document.createElement("a");

	// Menambahka properti pada element a
	a.href = "#";
	a.className = "badge badge-danger delete-todo";
	a.innerHTML = "Delete"; // Menambahkan child dalam element a dan element li

	li.appendChild(a);

	// Menampilkan value dari proses li di atas ke dalam todoList
	todoList.appendChild(li);
}

function getItemFromLocalStorage() {
	let todos;

	if (localStorage.getItem("todos") == null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	return todos;
}

// Ini adala function DOM

function getTodos() {
	const todos = getItemFromLocalStorage();

	todos.forEach((todo) => {
		createTodoElement(todo)
	})
}

function addTodo(e) {
	e.preventDefault(); // Dimana browser tidak akan reload setelah proses dijalankan

	// perintah untuk menghandel agar user tidak mengisi todo kosong
	if (todoInput.value) {
		createTodoElement(todoInput.value)

		addTodoLocalStorage(todoInput.value);

		// Menimpa value yang telah diisi di kolom todo input menjadi kosong
		todoInput.value = ""
	} else {
		alert("Masukan todo, tidak boleh kosong!")
	}
	
}

function addTodoLocalStorage(todoInputValue) {
	const todos = getItemFromLocalStorage();

	todos.push(todoInputValue)

	localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e) {
	e.preventDefault();

	// Membuat class baru delete-todo di html element a untuk inisialisasi button delete
	if (e.target.classList.contains("delete-todo")) {
		if (confirm("Apakah yakin akan menghapus?")) {
			const parent = e.target.parentElement;

			parent.remove();

			deleteTodoFromLocalStorage(parent);
		}
	}
}

function deleteTodoFromLocalStorage(deletedElement) {
	const todos = getItemFromLocalStorage(); // akan menghapus element parent li element

	todos.forEach((todo, index) => {
		if (deletedElement.firstChild.textContent === todo) {
			todos.splice(index, 1)
		}
	})

	localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodos() {
	todoList.innerHTML = "";

	clearTodosLocalStorage();
}

function clearTodosLocalStorage() {
	localStorage.clear();
}

function filterTodos(e) {
	const filterText = e.target.value.toLowerCase();
	const todoItems = document.querySelectorAll(".todo-item")

	todoItems.forEach((item) => {
		const itemText = item.firstChild.textContent.toLowerCase();

		if (itemText.indexOf(filterText) != -1) { // -1 berarti text kosong
			item.setAttribute("style", "display: block;");
		} else {
			item.setAttribute("style", "display: none !important;"); // important disini untuk menghilangkan sebuah children elemen
		}
	})
}

// Perubahan Text di Tampilan HTML lewat JS
const changeProjectHeadingTitle = (title) => {
	const projekTitle = document.querySelector("#projek-title");

	if (typeof title === 'string') {
		projekTitle.textContent = title;
	} else {
		console.error("argumen yang anda masukan bukan tipe string!")
	}
}

changeProjectHeadingTitle("JavaScript ES6")


