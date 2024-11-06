const appDiv = document.getElementById('app')

function showMessage(message) {
  appDiv.innerHTML = `<p>${message}</p>`
}

showMessage('Hello, Dario! Let’s get started with JavaScript!')
