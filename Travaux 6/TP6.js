// Fonctions asynchrones
function fetchUsers() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Utilisateurs chargés"), 1000);
  });
}

function fetchCourses() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Cours chargés"), 1500);
  });
}

function fetchGrades() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Notes chargées"), 500);
  });
}

const resultDiv = document.getElementById("result");

// Promise.all
function testAll() {
  resultDiv.textContent = "Chargement...";
  Promise.all([fetchUsers(), fetchCourses(), fetchGrades()])
    .then(res => {
      resultDiv.textContent = "Promise.all : " + res.join(" | ");
    });
}

// Promise.race
function testRace() {
  resultDiv.textContent = "Chargement...";
  Promise.race([fetchUsers(), fetchCourses(), fetchGrades()])
    .then(res => {
      resultDiv.textContent = "Promise.race : " + res;
    });
}

// Promise.allSettled
function testAllSettled() {
  resultDiv.textContent = "Chargement...";
  Promise.allSettled([fetchUsers(), fetchCourses(), fetchGrades()])
    .then(res => {
      resultDiv.textContent = "Promise.allSettled : " + JSON.stringify(res);
    });
}
