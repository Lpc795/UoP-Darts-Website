import fs from "fs";

async function fetchStandings() {
  const url =
    "https://www.uduk.co.uk/api/trpc/tournament.page,tournament.page,tournament.page,tournament.page,tournament.page,tournament.page,tournament.page?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22tournamentId%22%3A%22south_2526%22%2C%22paginationInputs%22%3A%7B%22matchdays%22%3A%7B%22index%22%3A0%2C%22size%22%3A5%7D%2C%22fixtures%22%3A%7B%22index%22%3A0%2C%22size%22%3A5%7D%7D%7D%7D%7D";

  const res = await fetch(url);
  const full = await res.json();

  const results = full?.[0]?.result?.data?.json?.results;
  if (!results) {
    console.error("Could not find results array");
    return;
  }

  const sorted = [...results].sort(
    (a, b) => b.w - a.w || b.l - a.l || b.gf - a.gf || b.ga - a.ga || b.gd - a.gd
  );

  const table = sorted.map((team, index) => ({
    pos: index + 1,
    team: team.name,
    p: team.p,
    w: team.w,
    l: team.l,
    gf: team.gf,
    ga: team.ga,
    gd: team.gd,
  }));

  fs.writeFileSync("league-data.json", JSON.stringify(table, null, 2));
  console.log("league-data.json updated");
}

fetchStandings();
