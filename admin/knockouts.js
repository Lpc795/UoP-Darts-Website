// Read ?players=4 from URL
const params = new URLSearchParams(window.location.search);
const playerCount = parseInt(params.get("players"));

// Build dropdowns on load
window.onload = () => {
    const container = document.getElementById("player-dropdowns");

    for (let i = 1; i <= playerCount; i++) {
        const div = document.createElement("div");
        div.className = "setup-row";

        div.innerHTML = `
            <label>Player ${i}:</label>
            <input type="text" class="player-name" placeholder="Enter player name">
        `;

        container.appendChild(div);
    }
};

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


    html += `</div>`;

    document.getElementById("bracket").innerHTML = html;
}

