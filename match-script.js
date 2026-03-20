async function loadMatches() {
  const res = await fetch("matches.json");
  const fixtures = await res.json();

  const tbody = document.querySelector("#match-body");

  fixtures.forEach(match => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${match.homeTeam}</td>
      <td>${match.homeWins} - ${match.awayWins}</td>
      <td>${match.awayTeam}</td>
    `;

    tbody.append(row);
  });
}

loadMatches();