const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const list = document.getElementById("taskList");

// Charger les tâches depuis le LocalStorage au démarrage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Fonction d'affichage des tâches
function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.dataset.index = index;
    list.appendChild(li);
  });
}

// Ajouter une tâche
addBtn.addEventListener("click", () => {
  if (input.value.trim() === "") return;

  tasks.push(input.value);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  renderTasks();
});

// Supprimer une tâche (event delegation)
list.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  tasks.splice(index, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
});

// Reset complet
resetBtn.addEventListener("click", () => {
  localStorage.clear();
  tasks = [];
  renderTasks();
});

// Affichage initial
renderTasks();
