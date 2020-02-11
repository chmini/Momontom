const form = document.querySelector(".js-form"),
  nameInput = form.querySelector("input"),
  greeting = document.querySelector(".js-greeting"),
  toDo = document.querySelector(".js-toDoForm");

const CURRENTUSER = "currentUser",
  SHOWING = "SHOW";

function saveCurrentUser(userName) {
  localStorage.setItem(CURRENTUSER, userName);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = nameInput.value;
  greetingUser(currentValue);
  saveCurrentUser(currentValue);
}

function askName() {
  form.classList.add(SHOWING);
  toDo.classList.remove(SHOWING);
  form.addEventListener("submit", handleSubmit);
}

function greetingUser(userName) {
  form.classList.remove(SHOWING);
  greeting.classList.add(SHOWING);
  toDo.classList.add(SHOWING);
  greeting.innerText = `Hello ${userName}`;
}

function loadName() {
  const loadedName = localStorage.getItem(CURRENTUSER);
  if (loadedName !== null) greetingUser(loadedName);
  else askName();
}

function init() {
  loadName();
}

init();
