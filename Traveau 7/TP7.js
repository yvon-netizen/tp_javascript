const result = document.getElementById("result");

/* ==============================
   Exercice 1 : withTimeout
================================ */

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("⏰ Temps dépassé"), ms);

    promise.then(resolve).catch(reject);
  });
}

function testTimeout() {
  result.textContent = "Chargement...";

  const slowTask = new Promise(resolve => {
    setTimeout(() => resolve("✅ Tâche terminée"), 2000);
  });

  withTimeout(slowTask, 1000)
    .then(res => result.textContent = res)
    .catch(err => result.textContent = "Erreur : " + err);
}

/* ==============================
   Exercice 2 : retry
================================ */

let essais = 0;

function unstableTask() {
  return new Promise((resolve, reject) => {
    essais++;
    if (essais < 3) {
      reject("❌ Échec tentative " + essais);
    } else {
      resolve("✅ Succès à la tentative " + essais);
    }
  });
}

function retry(fn, attempts, delay) {
  return new Promise((resolve, reject) => {
    function attempt() {
      fn()
        .then(resolve)
        .catch(err => {
          result.textContent = err;
          if (attempts === 0) {
            reject("❌ Échec total");
          } else {
            attempts--;
            setTimeout(attempt, delay);
          }
        });
    }
    attempt();
  });
}

function testRetry() {
  essais = 0;
  result.textContent = "Tentatives...";

  retry(unstableTask, 3, 1000)
    .then(res => result.textContent = res)
    .catch(err => result.textContent = err);
}
