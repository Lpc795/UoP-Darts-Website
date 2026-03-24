// Read URL parameters
const params = new URLSearchParams(window.location.search);
const playerCount = parseInt(params.get("players"));
const losersBracket = params.get("losers") === "true";

// Example list of players (replace with DB later)
const allPlayers = [
  "Player A",
  "Player B",
  "Player C",
  "Player D",
  "Player E",
  "Player F",
  "Player G",
  "Player H"
];

// Generate dropdowns
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


  // Redirect to bracket page
  const playersParam = encodeURIComponent(JSON.stringify(chosen));
  window.open(`/admin/bracket?players=${playersParam}&losers=${losersBracket}`, "_blank");
}
