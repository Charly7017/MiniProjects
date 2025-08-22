// ==== Base elements ====
const addModalEl = document.getElementById('modalAddTask');
const editModalEl = document.getElementById('modalEditTask');

const columns = document.querySelectorAll(".kanban__column");
const todoList = document.querySelectorAll(".kanban__task-list")[0];
const progressList = document.querySelectorAll(".kanban__task-list")[1];
const doneList = document.querySelectorAll(".kanban__task-list")[2];

const showAddModalBtn = document.querySelector(".kanban__column--btnIcon");

// Modal elements
const addTaskInput = addModalEl.querySelector(".add-task-input");
const addTaskBtn = addModalEl.querySelector(".add-task-btn");

const editTaskInput = editModalEl.querySelector(".edit-task-input");
const editTaskBtn = editModalEl.querySelector(".edit-task-btn");

let arrTasks = [];
let taskToEdit = null;
let draggingElementText = null;


columns.forEach(column => {
  column.addEventListener("dragover", dragoverHandler);
  column.addEventListener("drop", dropHandler);
});


getTasksFromSessionStorage();

showAddModalBtn.addEventListener("click", showModalAddTask);
addTaskBtn.addEventListener("click", addTask);
editTaskBtn.addEventListener("click", editTask);

function getTasksFromSessionStorage() {
  const savedTasks = JSON.parse(sessionStorage.getItem("allTasks")) || [];
  arrTasks = savedTasks;

  savedTasks.forEach(element => {
    const li = createLi(element.name);
    if(element.type === "TODO"){
      todoList.appendChild(li);
    }
    else if(element.type === "PROGRESS"){
      progressList.appendChild(li);
    }
    else{
      doneList.appendChild(li);
    }
  });
}

function showModalAddTask() {
  addTaskInput.value = ""; 
  const modal = new bootstrap.Modal(addModalEl);
  modal.show();
}

function addTask() {
  const taskText = addTaskInput.value.trim();
  if (!taskText) return;

  const exists = arrTasks.some(t => t.name.trim().toLowerCase() === taskText.toLowerCase());

  if (exists) {
    alert("A task with that name already exists");
    return;
  }

  const modalInstance = bootstrap.Modal.getInstance(addModalEl);
  if (modalInstance) {
    modalInstance.hide();
  }

  const li = createLi(taskText);
  todoList.appendChild(li);

  const tasksObj = 
  {
    type:"TODO", 
    name:taskText, 
  };
  
  arrTasks.push(tasksObj);
  sessionStorage.setItem("allTasks", JSON.stringify(arrTasks));
}

function createLi(text) {
  const li = document.createElement("li");
  li.id = "task-" + Date.now() + Math.random().toString(16).slice(2);
  li.draggable = true;
  li.classList.add("kanban__task");
  li.dataset.pureText = text;

  const textSpan = document.createElement("span");
  textSpan.classList.add("task-text");
  textSpan.textContent = text;
  li.appendChild(textSpan);

  const iconUpdate = document.createElement("i");
  iconUpdate.classList.add("bi", "bi-file-plus");
  iconUpdate.addEventListener("click", showModalEditTask);

  const iconDelete = document.createElement("i");
  iconDelete.classList.add("bi", "bi-trash");
  iconDelete.addEventListener("click", deleteTask);

  li.appendChild(iconUpdate);
  li.appendChild(iconDelete);
  li.addEventListener("dragstart", dragstartHandler);
  return li;
}

function showModalEditTask(e) {
  taskToEdit = e.target.parentElement;
  const currentText = taskToEdit.querySelector(".task-text")?.textContent || "";
  editTaskInput.value = currentText;

  const modal = new bootstrap.Modal(editModalEl);
  modal.show();
}

function editTask() {
  if (!taskToEdit) return;

  const newText = editTaskInput.value.trim();
  if (!newText) return;

  const textSpan = taskToEdit.querySelector(".task-text");
  const oldText = textSpan.textContent;
  debugger
  if (arrTasks.some(t => t.name.trim().toLowerCase() === newText.toLowerCase() && t.name !== oldText)) {
    alert("A task with that name already exists");
    return;
  }

  const modalInstance = bootstrap.Modal.getInstance(editModalEl);
  if (modalInstance) {
    modalInstance.hide();
  }

  textSpan.textContent = newText;
  taskToEdit.dataset.pureText = newText;

 
  const index = arrTasks.findIndex(p=>p.name === oldText);
  if (index !== -1) {
    arrTasks[index].name = newText;
    sessionStorage.setItem("allTasks", JSON.stringify(arrTasks));
  }

  taskToEdit = null;
}

function deleteTask(e) {
  const li = e.target.parentElement;
  const pure = li.dataset.pureText || li.querySelector(".task-text")?.textContent || "";

  arrTasks = arrTasks.filter(p => p.name !== pure);
  li.remove();
  sessionStorage.setItem("allTasks", JSON.stringify(arrTasks));
}

function dragstartHandler(ev) {
  const txtEl = ev.currentTarget.querySelector(".task-text");
  draggingElementText = (txtEl?.textContent || "").trim();
  ev.dataTransfer.setData("text/plain", ev.currentTarget.id);
}


function dragoverHandler(ev) {
  ev.preventDefault();
}

function dropHandler(ev) {
  ev.preventDefault();

  const column = ev.currentTarget; 

  const index = arrTasks.findIndex(p => p.name === draggingElementText);
  if (index === -1) return;

  if (column.classList.contains("kanban__column--todo")) {
    arrTasks[index].type = "TODO";
  } else if (column.classList.contains("kanban__column--in-progress")) {
    arrTasks[index].type = "PROGRESS";
  } else {
    arrTasks[index].type = "DONE";
  }
  sessionStorage.setItem("allTasks", JSON.stringify(arrTasks));


  const id = ev.dataTransfer.getData("text/plain");
  if (!id) return;

  const draggedElement = document.getElementById(id);
  if (!draggedElement) return;

  const taskList = column.querySelector(".kanban__task-list");
  if (taskList) taskList.appendChild(draggedElement);
}

