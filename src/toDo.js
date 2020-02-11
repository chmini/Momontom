const toDoForm = document.querySelector(".js-toDoForm"),
  input = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDos");

const TODOS = "toDos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const clicked = event.target;
  let target = clicked.parentNode;
  if (target.tagName === "BUTTON") target = target.parentNode;
  target.parentNode.removeChild(target);
  const clearToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(target.id);
  });
  toDos = clearToDos;
  saveToDos(toDos);
}

function paintToDo(toDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  span.innerText = toDo;
  delBtn.innerHTML = '<i class="fas fa-times"></i>';
  delBtn.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  const timestamp = Date.now();
  li.id = timestamp;
  const toDoObj = {
    id: timestamp,
    text: toDo
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintToDo(currentValue);
  input.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS);
  if (loadedToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
