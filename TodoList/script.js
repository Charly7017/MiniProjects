const inputTask = document.querySelector(".inputTask")
const addBtn = document.querySelector(".addBtn")
const container = document.querySelector(".container")
const filterCompleted = document.querySelector(".filterCompleted")
let cont = 0
let arrTasks = []

//Show tasks when reloading page through local storage
document.addEventListener("DOMContentLoaded", function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    arrTasks = savedTasks;
    cont = savedTasks.length > 0 ? Math.max(...savedTasks.map(task => task.id)) + 1 : 0;

    savedTasks.forEach(task => {
        const divTasksAdded = createTaskDiv(task.id, task.name);
        if (task.done) {
            divTasksAdded.querySelector(".inputTask").style.textDecoration = "line-through";
            divTasksAdded.setAttribute("data-completed", true);
        }
        container.appendChild(divTasksAdded);
    });
});


// Function to create div container
function createTaskDiv(taskId, taskValue) {
    const divTasksAdded = document.createElement("div")
    divTasksAdded.classList.add("task")
    divTasksAdded.setAttribute("id", taskId)
    divTasksAdded.setAttribute("data-completed", false)

    const inputElement = createInputElement(taskValue)
    const btnDone = createCompleteButton(inputElement, taskId)
    const btnDelete = createDeleteButton()

    divTasksAdded.appendChild(inputElement)
    divTasksAdded.appendChild(btnDone)
    divTasksAdded.appendChild(btnDelete)

    return divTasksAdded
}

// Function to create input to enter a task
function createInputElement(taskValue) {
    const inputElement = document.createElement("input")
    inputElement.classList.add("inputTask")
    inputElement.setAttribute("readonly", true)
    inputElement.value = taskValue
    return inputElement
}

// Function to create complete button
function createCompleteButton(inputElement, taskId) {
    const btnDone = document.createElement("button")
    btnDone.classList.add("complete-btn")
    btnDone.textContent = "✔"
    btnDone.addEventListener("click", function (e) {
        const divTask = e.target.parentElement
        const foundTask = arrTasks.find((p) => p.id === taskId)

        if (inputElement.style.textDecoration === "line-through") {
            inputElement.style.textDecoration = "none"
            divTask.setAttribute("data-completed", false)
            foundTask.done = false
        } else {
            inputElement.style.textDecoration = "line-through"
            divTask.setAttribute("data-completed", true)
            foundTask.done = true
        }

        localStorage.setItem("tasks", JSON.stringify(arrTasks));
    })
    return btnDone
}

// Function to create delete button
function createDeleteButton() {
    const btnDelete = document.createElement("button")
    btnDelete.classList.add("delete-btn")
    btnDelete.textContent = "🗑"
    btnDelete.addEventListener("click", function (e) {
        const taskIdDeleted = parseInt(e.target.parentElement.getAttribute("id"))

        // Actualizar el arreglo eliminando la tarea correspondiente
        arrTasks = arrTasks.filter(p => p.id !== taskIdDeleted)

        localStorage.setItem("tasks", JSON.stringify(arrTasks));
        // Eliminar el elemento del DOM
        e.target.parentElement.remove()
    })
    return btnDelete
}

// Show or hide tasks
function toggleTasks(selector, displayStyle) {
    const tasks = document.querySelectorAll(selector)
    tasks.forEach(task => {
        task.style.display = displayStyle
    })
}

// Add tasks event
addBtn.addEventListener("click", function () {
    if (inputTask.value.trim().length === 0) {
        alert("Please enter the task")
    } else {
        const taskId = ++cont
        const taskValue = inputTask.value

        const divTasksAdded = createTaskDiv(taskId, taskValue)

        const taskObject = {
            id: taskId,
            name: taskValue,
            done: false
        }

        arrTasks.push(taskObject)
        container.appendChild(divTasksAdded)

        inputTask.value = ""
        localStorage.setItem("tasks",JSON.stringify(arrTasks))
        console.log(arrTasks)
    }
})

// Filter tasks event
filterCompleted.addEventListener("change", function (e) {
    let filter = []
    const valueOption = e.target.value

    if (valueOption === "Completed") {
        toggleTasks('div[data-completed="false"]', "none")
        toggleTasks('div[data-completed="true"]', "flex")
        filter = arrTasks.filter((p) => p.done === true)
    } else if (valueOption === "Uncompleted") {
        toggleTasks('div[data-completed="true"]', "none")
        toggleTasks('div[data-completed="false"]', "flex")
        filter = arrTasks.filter((p) => p.done === false)
    } else {
        toggleTasks('div[data-completed]', "flex")
        filter = arrTasks
    }
})
