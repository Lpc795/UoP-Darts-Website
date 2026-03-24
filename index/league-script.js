async function loadLeagueTable() {
  const res = await fetch("league-data.json");
  const data = await res.json();

  const tbody = document.querySelector("#league-body");

  data.forEach(team => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${team.pos}</td>
      <td>${team.team}</td>
      <td>${team.p}</td>
      <td>${team.w}</td>
      <td>${team.l}</td>
      <td>${team.gf}</td>
      <td>${team.ga}</td>
      <td>${team.gd}</td>
    `;
    tbody.append(row);
  });
}
loadLeagueTable();
