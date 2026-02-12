const students = [
  { id: 1, nom: "Aina", parcours: "IAD", notes: [12, 14, 16] },
  { id: 2, nom: "Tiana", parcours: "ARS", notes: [9, 10, 11] },
  { id: 3, nom: "Toky", parcours: "GLBD", notes: [15, 17, 16] },
  { id: 4, nom: "Hasina", parcours: "IAD", notes: [8, 9, 10] },
  { id: 5, nom: "Mialy", parcours: "ARS", notes: [13, 11, 12] }
];

// 1) Ajouter la moyenne
const withAverage = students.map(s => ({
  ...s,
  moyenne: s.notes.reduce((a, b) => a + b, 0) / s.notes.length
}));

// 2) Filtrer moyenne >= 12
const admitted = withAverage.filter(s => s.moyenne >= 12);

// 3) Trier par moyenne décroissante
const sorted = admitted.sort((a, b) => b.moyenne - a.moyenne);

// 4) Grouper par parcours
const grouped = sorted.reduce((acc, s) => {
  acc[s.parcours] = acc[s.parcours] || [];
  acc[s.parcours].push(s);
  return acc;
}, {});

console.log("Étudiants avec moyenne :", withAverage);
console.log("Admis :", admitted);
console.log("Triés :", sorted);
console.log("Groupés :", grouped);
