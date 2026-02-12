const teacher = {
  nom: "Rakoto",
  matiere: "JavaScript",
  presenter() {
    console.log(`Je suis ${this.nom} et j'enseigne ${this.matiere}`);
  }
};

teacher.presenter();

// Perte de contexte
const show = teacher.presenter;
// show(); 

// Correction avec bind
const fixedShow = teacher.presenter.bind(teacher);
fixedShow();

// call / apply
function printIdentity(ville, pays) {
  console.log(`${this.nom} - ${ville}, ${pays}`);
}

printIdentity.call(teacher, "Antananarivo", "Madagascar");
printIdentity.apply(teacher, ["Tamatave", "Madagascar"]);
