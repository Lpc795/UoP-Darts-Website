// Read URL parameters
const params = new URLSearchParams(window.location.search);
const playerCount = parseInt(params.get("players"));

// Example list of players (replace with DB later)
const allPlayers = [
    "Ike",
    "James",
    "Adam",
    "Louis",
    "Alex",
    "Ruben",
    "Rowan",
];

// Build dropdowns on load
window.onload = () => {
    const container = document.getElementById("player-dropdowns");

    for (let i = 1; i <= playerCount; i++) {
        const div = document.createElement("div");
        div.className = "setup-row";

        let options = `<option value="">Select player</option>`;
        allPlayers.forEach(p => {
            options += `<option value="${p}">${p}</option>`;
        });

        div.innerHTML = `
            <label>Player ${i}:</label>
            <select class="player-select">${options}</select>
        `;

        container.appendChild(div);
    }
};

// Handle submission
function submitPlayers() {
    const selects = document.querySelectorAll(".player-select");
    const chosen = [];

    for (const sel of selects) {
        if (!sel.value) {
            alert("Please select all players.");
            return;
        }
        chosen.push(sel.value);
    }

    // Hide player selection
    document.getElementById("player-select").style.display = "none";

    // Show bracket
    document.getElementById("bracket-section").style.display = "block";

    generateBracket(chosen);
}

// Generate bracket
function generateBracket(players) {
    const bracketDiv = document.getElementById("bracket");

    // Shuffle players
    const shuffled = [...players].sort(() => Math.random() - 0.5);

    // Create matchups
    const matches = [];
    for (let i = 0; i < shuffled.length; i += 2) {
        matches.push([shuffled[i], shuffled[i + 1] || "BYE"]);
    }

    // Build HTML
    let html = `<div class="round"><h3>Round 1</h3>`;

    matches.forEach(match => {
        html += `
            <div class="match">
                <div class="player">${match[0]}</div>
                <div class="player">${match[1]}</div>
            </div>
        `;
    });

    html += `</div>`;

    bracketDiv.innerHTML = html;
}
