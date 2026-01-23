let students = [];
let currentSearch = '';
let currentParcours = '';
let currentSort = 'nom-asc';

async function loadData() {
    try {
        const response = await fetch('student.json');
        const data = await response.json();
        
        students = data.map(student => ({
            ...student,
            moyenne: student.notes.reduce((sum, n) => sum + n, 0) / student.notes.length
        }));
        
        renderTable();
    } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
    }
}

function getMoyenneClass(moyenne) {
    if (moyenne >= 16) return 'excellent';
    if (moyenne >= 12) return 'bon';
    if (moyenne >= 10) return 'moyen';
    return 'faible';
}

function updateStats(filtered) {
    const total = filtered.length;
    const moyGen = total > 0 ? (filtered.reduce((s, st) => s + st.moyenne, 0) / total).toFixed(2) : 0;
    const admis = filtered.filter(s => s.moyenne >= 10).length;

    document.getElementById('statsContainer').innerHTML = `
        <div class="stat-card purple"><div class="stat-value">${total}</div><div class="stat-label">Étudiants</div></div>
        <div class="stat-card green"><div class="stat-value">${moyGen}</div><div class="stat-label">Moyenne Générale</div></div>
        <div class="stat-card orange"><div class="stat-value">${admis}</div><div class="stat-label">Admis</div></div>
    `;
}

// --- Logique de rendu et filtrage (Concept TP 10) ---
function renderTable() {
    let filtered = students.filter(s => 
        s.nom.toLowerCase().includes(currentSearch.toLowerCase()) &&
        (currentParcours === '' || s.parcours === currentParcours)
    );

    // Tri dynamique
    const [field, order] = currentSort.split('-');
    filtered.sort((a, b) => {
        let comp = (field === 'moyenne' || field === 'id') ? a[field] - b[field] : a[field].localeCompare(b[field]);
        return order === 'asc' ? comp : -comp;
    });

    updateStats(filtered);

    const tableBody = document.getElementById('tableBody');
    const noResults = document.getElementById('noResults');

    if (filtered.length === 0) {
        tableBody.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    tableBody.innerHTML = filtered.map(s => `
        <tr>
            <td>${s.id}</td>
            <td><strong>${s.nom}</strong></td>
            <td><span class="badge badge-${s.parcours.toLowerCase()}">${s.parcours}</span></td>
            <td>${s.notes.join(', ')}</td>
            <td><span class="moyenne ${getMoyenneClass(s.moyenne)}">${s.moyenne.toFixed(2)}</span></td>
        </tr>
    `).join('');
}

// --- Écouteurs d'événements ---
document.getElementById('searchInput').addEventListener('input', (e) => { currentSearch = e.target.value; renderTable(); });
document.getElementById('parcoursFilter').addEventListener('change', (e) => { currentParcours = e.target.value; renderTable(); });
document.getElementById('exportBtn').addEventListener('click', () => {
    const csv = "ID,Nom,Parcours,Moyenne\n" + students.map(s => `${s.id},${s.nom},${s.parcours},${s.moyenne.toFixed(2)}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'export_etudiants.csv';
    link.click();
});
// --- Nouveau bloc pour le tri au clic ---
document.querySelectorAll('.sortable').forEach(header => {
    header.addEventListener('click', () => {
        const field = header.getAttribute('data-sort');
        
        // Si on reclique sur la même colonne, on inverse l'ordre
        if (currentSort === `${field}-asc`) {
            currentSort = `${field}-desc`;
        } else {
            currentSort = `${field}-asc`;
        }
        
        renderTable(); // On redessine le tableau avec le nouvel ordre
    });
});
// Initialisation
loadData();