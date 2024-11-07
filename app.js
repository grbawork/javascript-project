// Select DOM elements
const input = document.getElementById('todo-input')
const addButton = document.getElementById('add-todo-btn')
const todoList = document.getElementById('todo-list')

// Array to store to-do items
let todos = []

// Function to add a new to-do item
function addTodo() {
  const todoText = input.value.trim() // Get input value and trim whitespace

  if (todoText) {
    // Add to-do item to the array
    todos.push(todoText)

    // Clear the input field
    input.value = ''

    // Update the displayed to-do list
    renderTodos()
  } else {
    alert('Please enter a to-do item!')
  }
}

// Function to display the to-do list
function renderTodos() {
  // Clear existing list items
  todoList.innerHTML = ''

  // Loop through todos array and create list items
  todos.forEach((todo, index) => {
    const li = document.createElement('li')
    li.textContent = todo

    // Add a remove button to each item
    const removeButton = document.createElement('button')
    removeButton.textContent = 'Remove'
    removeButton.onclick = () => removeTodo(index)

    li.appendChild(removeButton)
    todoList.appendChild(li)
  })
}

// Function to remove a to-do item
function removeTodo(index) {
  todos.splice(index, 1) // Remove item from the array
  renderTodos() // Re-render the to-do list
}

// Add event listener to the button
addButton.addEventListener('click', addTodo)
