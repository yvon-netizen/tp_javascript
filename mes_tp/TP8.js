// Récupération des éléments du DOM
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// Ajout d'une tâche
addBtn.addEventListener("click", () => {
  const text = input.value.trim();

  // Vérification si le champ est vide
  if (text === "") return;

  // Création de l'élément li
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${text}</span>
    <button class="delete">❌</button>
  `;

  // Ajout à la liste
  list.appendChild(li);

  // Réinitialisation du champ
  input.value = "";
});

// Event Delegation : un seul listener pour toute la liste
list.addEventListener("click", (e) => {

  // Si on clique sur le bouton supprimer
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }

  // Si on clique sur le texte de la tâche
  if (e.target.tagName === "SPAN") {
    e.target.classList.toggle("done");
  }
});
