async function loadStatsTable() {
  const res = await fetch("team-stats.json");
  const data = await res.json();
  console.log(data)

  const tbody = document.querySelector("#stats-body");

  data.forEach(team => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${team.seed}</td>
      <td>${team.name}</td>
    `;
    tbody.append(row);
  });
}
loadStatsTable();