const toDoForm = document.querySelector(".js-toDoForm"),
  input = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDos"),
  finList = document.querySelector(".js-fins");

const TODOS = "toDos";
const FINS = "fins";

let toDos, fins;

function getTaskObj(text) {
  return {
    id : String(Date.now()),
    text: text
  }
}

function deleteToDo(taskId) {
  toDos = toDos.filter(function(task) {
    return task.id !== taskId;
  });
}

function deleteFin(taskId) {
  fins = fins.filter(function(task) {
    return task.id !== taskId;
  });
}

function deleteTask(taskId) {
  let target = event.target.parentNode;
  if(target.tagName === "BUTTON"){
    target = target.parentNode;
  }
  target.parentNode.removeChild(target);
  deleteFin(target.id);
  deleteToDo(target.id);
  saveState();
}

function findInToDos(taskId) {
  return toDos.find(function(task){
    return task.id === taskId;
  });
}

function findInFins(taskId) {
  return fins.find(function(task){
    return task.id === taskId;
  });
}

function addToDos(task){
  toDos.push(task);
}

function addFins(task) {
  fins.push(task)
}

function moveToDos() {
  let target = event.target.parentNode;
  if(target.tagName === "BUTTON"){
    target = target.parentNode;
  }
  finList.removeChild(target);
  const taskId = target.id;
  const task = findInFins(taskId);
  deleteFin(taskId);
  addToDos(task);
  saveState();
  paintToDo(task);
}

function moveToFin(event) {
  let target = event.target.parentNode;
  if(target.tagName === "BUTTON"){
    target = target.parentNode;
  }
  toDoList.removeChild(target);
  const taskId = target.id;
  const task = findInToDos(taskId);
  deleteToDo(taskId);
  addFins(task);
  saveState();
  paintFin(task);
}

function getGeneralList(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  span.innerText = task.text;
  delBtn.addEventListener("click", deleteTask);
  delBtn.innerHTML = '<i class="fas fa-times"></i>';
  li.append(span, delBtn);
  li.id = task.id;
  return li;
}

function paintToDo(task) {
  const generalList = getGeneralList(task);
  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = '<i class="fas fa-check"></i>';
  checkBtn.addEventListener("click", moveToFin);
  generalList.append(checkBtn);
  toDoList.appendChild(generalList);
}

function paintFin(task) {
  const generalList = getGeneralList(task);
  const backBtn = document.createElement("button");
  backBtn.innerHTML = '<i class="fas fa-backward"></i>';
  backBtn.addEventListener("click", moveToDos);
  generalList.append(backBtn);
  finList.appendChild(generalList);
}

function saveState() {
  localStorage.setItem(TODOS, JSON.stringify(toDos));
  localStorage.setItem(FINS, JSON.stringify(fins));
}

function loadState() {
  toDos = JSON.parse(localStorage.getItem(TODOS)) || [];
  fins = JSON.parse(localStorage.getItem(FINS)) || [];
}

function restoreState() {
  toDos.forEach(function(task) {
    paintToDo(task);
  });
  fins.forEach(function(task) {
    paintFin(task);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const task = getTaskObj(input.value);
  input.value = "";
  paintToDo(task);
  addToDos(task);
  saveState();
}

function init() {
  toDoForm.addEventListener("submit", handleSubmit);
  loadState();
  restoreState();
}

init();
