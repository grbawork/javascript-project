const input = document.getElementById('task-input')
const addTaskBtn = document.getElementById('add-task-btn')
const taskList = document.getElementById('task-list')

let tasks = JSON.parse(localStorage.getItem('tasks')) || [] // Retrieve saved tasks or initialize empty

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// 1. Add Task
function addTask() {
  const taskText = input.value.trim()

  if (!taskText) {
    alert('Task cannot be empty')
    return
  }

  const newTask = {
    id: Date.now(), // Unique ID
    text: taskText,
    completed: false,
  }

  tasks.push(newTask)
  input.value = '' // Clear input
  saveTasks()
  renderTasks()
}

// 2. Render Tasks
function renderTasks(filter = 'all') {
  taskList.innerHTML = ''

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'incomplete') return !task.completed
    return true // Default to showing all
  })

  filteredTasks.forEach((task) => {
    const li = document.createElement('li')
    li.className = 'flex justify-between p-2 border-b'
    li.innerHTML = `
            <span class="${
              task.completed ? 'line-through text-gray-500' : ''
            }">${task.text}</span>
            <div>
                <button onclick="toggleTask(${
                  task.id
                })" class="text-green-500 mr-2">Complete</button>
                <button onclick="deleteTask(${
                  task.id
                })" class="text-red-500">Delete</button>
            </div>
        `
    taskList.appendChild(li)
  })
}
// 3. Toggle Task Completion
function toggleTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id)

  if (taskIndex > -1) {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      completed: !tasks[taskIndex].completed,
    }
    saveTasks()
    renderTasks()
  }
}

// 4. Delete Task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id)
  saveTasks()
  renderTasks()
}
document
  .getElementById('show-all')
  .addEventListener('click', () => renderTasks('all'))
document
  .getElementById('show-completed')
  .addEventListener('click', () => renderTasks('completed'))
document
  .getElementById('show-incomplete')
  .addEventListener('click', () => renderTasks('incomplete'))
addTaskBtn.addEventListener('click', addTask)

// Render tasks on initial load
renderTasks()
