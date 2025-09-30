/**
 * script.js
 * Lógica para carregar os dados do leaderboard e atualizar o HTML dinamicamente.
 */

// --- SIMULAÇÃO DE BANCO DE DADOS (Substitua por uma chamada AJAX/Fetch real se usar um backend) ---
const highScoresData = [
    { name: 'Ryu', score: 55010 },
    { name: 'Jax', score: 85500 },
    { name: 'ACE', score: 99990 },
    { name: 'Ali', score: 35100 },
    { name: 'KYL', score: 60300 },
    { name: 'LUC', score: 72150 },
    { name: 'T3o', score: 38750 },
    { name: 'Zen', score: 49880 },
    { name: 'D4V', score: 29999 },
    { name: 'Mia', score: 42000 },
    // Adicione mais jogadores se desejar
];
// -----------------------------------------------------------------------------------------------

/**
 * Função para formatar o score com separadores de milhares (ex: 99990 -> 99,990).
 * @param {number} score - A pontuação a ser formatada.
 * @returns {string} O score formatado.
 */
function formatScore(score) {
    // Usando toLocaleString para formatação localizada (pt-BR usa ponto como separador, mas para o estilo arcade, vírgula é comum)
    // Usaremos replace para garantir a vírgula como separador de milhares, se necessário para o estilo.
    return score.toLocaleString('en-US'); 
}

/**
 * Função principal para carregar e exibir o leaderboard.
 * @param {Array<Object>} data - A lista de objetos de pontuação.
 */
function loadLeaderboard(data) {
    // 1. Encontra o elemento <tbody> para injetar as linhas
    const tbody = document.querySelector('.leaderboard tbody');
    
    // Se o <tbody> não existir, interrompe a função
    if (!tbody) {
        console.error("Elemento 'tbody' não encontrado. Verifique se o HTML está correto.");
        return;
    }

    // 2. Ordena os dados em ordem decrescente de score
    const sortedData = [...data].sort((a, b) => b.score - a.score);

    // 3. Zera o conteúdo atual do tbody (remove as linhas estáticas do HTML)
    tbody.innerHTML = '';

    // 4. Itera sobre os dados ordenados para criar as linhas da tabela
    sortedData.forEach((player, index) => {
        const rank = index + 1; // O rank é o índice + 1
        
        // Define a classe CSS para o destaque do Top 3
        let rowClass = '';
        if (rank === 1) {
            rowClass = 'rank-1';
        } else if (rank === 2) {
            rowClass = 'rank-2';
        } else if (rank === 3) {
            rowClass = 'rank-3';
        }

        // Cria o elemento <tr>
        const row = document.createElement('tr');
        row.className = rowClass;

        // Cria o conteúdo HTML da linha (células <td>)
        const rowContent = `
            <td class="rank">${rank}${rank > 3 ? 'th' : (rank === 1 ? 'st' : (rank === 2 ? 'nd' : 'rd'))}</td>
            <td class="points">${formatScore(player.score)}</td>
            <td class="name">${player.name.substring(0, 3).toUpperCase()}</td> `;
        
        row.innerHTML = rowContent;

        // Adiciona a nova linha ao <tbody>
        tbody.appendChild(row);
    });
}

// 5. Inicia o carregamento do leaderboard quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    loadLeaderboard(highScoresData);
});
