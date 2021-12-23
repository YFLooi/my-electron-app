// const { ipcRenderer } = require("electron");
const Electron = window.electron;

function submitNewTask() {
  const taskList = document.getElementById("taskList");
  const newTaskInput = document.getElementById("newTaskInput");

  console.log(`Adding new task: ${newTaskInput.value}`);

  // Triggers notification using electron.js notification module in main.js process
  // ipcRenderer.invoke("show-notification", newTask.value);
  Electron.showNotification(newTaskInput.value);

  taskList.insertAdjacentHTML(
    "beforeend",
    `<li class="list-group-item">${newTaskInput.value}</li>`
  );

  // Clear newTaskInput <input/> field
  newTaskInput.value = "";
}

// Event listeners won't work because the target DOM element
// is null...why?
// If it is because it is called before render, why won't it wait for render to
// complete first?
// document.getElementById("newTaskSubmit").addEventListener("click", () => {
//   console.log(`Adding new task: ${newTaskInput.value}`);

//   taskList.insertAdjacentHTML(
//     "beforeend",
//     `<li class="list-group-item">${newTaskInput.value}</li>`
//   );

//   // Clear newTaskInput <input/> field
//   newTaskInput.value = "";
// });

function triggerTextDisplay() {
  console.log(`Triggering text display...`);
  let textDisplay = document.getElementById("textDisplay");
  console.log(textDisplay.innerHTML);

  if (textDisplay.innerHTML.length < 1) {
    console.log(`Empty innerHTML. Adding test text`);
    document.getElementById("textDisplay").innerHTML = "Some test text";
  } else {
    document.getElementById("textDisplay").innerHTML = "";
  }
}
