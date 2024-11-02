document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');

    document.getElementById('saveButton').addEventListener('click', () => {
        const nick = document.getElementById('nickInput').value;
        if (nick) {
            // Guardar la puntuación
            let rankings = JSON.parse(localStorage.getItem('rankings') || '[]');
            rankings.push({ nick, score: parseInt(score) });
            rankings.sort((a, b) => b.score - a.score);
            rankings = rankings.slice(0, 10); // Mantén solo los 10 mejores
            localStorage.setItem('rankings', JSON.stringify(rankings));
            
            // Redirigir al menú
            window.location.href = '/menu.html';
        } else {
            alert('Please enter a nickname');
        }
    });
});