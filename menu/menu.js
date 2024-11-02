document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startButton').addEventListener('click', function() {
        window.location.href = '/index.html';
    });

    // Cargar y mostrar rankings
    const rankings = JSON.parse(localStorage.getItem('rankings') || '[]');
    const tableBody = document.querySelector('#rankingsTable tbody');
    
    rankings.forEach((ranking, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = ranking.nick;
        row.insertCell(2).textContent = ranking.score;
    });
});