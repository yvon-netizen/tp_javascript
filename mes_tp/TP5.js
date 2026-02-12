// Fonction wait : met le programme en pause pendant ms millisecondes
// Elle retourne une Promise qui se résout après le temps donné
function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms); // resolve est appelé après ms
  });
}

// Simulation d'une connexion utilisateur
// user : nom d'utilisateur
// pass : mot de passe
// Retourne une Promise
function simulateLogin(user, pass) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Vérification des identifiants
      if (user === "admin" && pass === "1234") {
        // Si correct → succès
        resolve("TOKEN123"); // token simulé
      } else {
        // Sinon → erreur
        reject("Login incorrect");
      }
    }, 1000); // délai de 1 seconde
  });
}

// Simulation de récupération des données utilisateur
// token : jeton d'authentification
function getUserData(token) {
  return new Promise(resolve => {
    setTimeout(() => {
      // Données simulées
      resolve({
        nom: "Admin",
        role: "superuser"
      });
    }, 1000);
  });
}

// Fonction principale utilisant async/await
async function main() {
  try {
    // Attente de la connexion
    const token = await simulateLogin("admin", "1234");
    console.log("Token :", token);

    // Attente de la récupération des données utilisateur
    const data = await getUserData(token);
    console.log("Données utilisateur :", data);

  } catch (error) {
    // Gestion des erreurs (login incorrect, etc.)
    console.error("Erreur :", error);
  }
}

// Appel de la fonction principale
main();
