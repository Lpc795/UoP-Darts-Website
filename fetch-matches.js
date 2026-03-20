import fs from "fs";

const homeDates = {
  "portsmouth": "2025-10-8",
  "solent": "2025-10-15",
  "winchester": "2025-10-29",
  "ucfbw": "2025-11-26",
  "southampton": "2026-02-18",
  "bournemouth": "2026-02-25",
};

const awayDates = {
  "portsmouth": "2026-01-28",
  "solent": "2026-02-04",
  "winchester": "2026-03-18",
  "ucfbw": "2026-03-11",
  "southampton": "2025-11-12",
  "bournemouth": "2025-11-05",
};

function getOpponentGroup(home, away) {
  const text = `${home} ${away}`.toLowerCase();

  if (text.includes("bournemouth")) return "bournemouth";
  if (text.includes("solent")) return "solent";
  if (text.includes("southampton")) return "southampton";
  if (text.includes("winchester")) return "winchester";
  if (text.includes("ucfbw")) return "ucfbw";
  if (text.includes("portsmouth")) return "portsmouth";

  return null;
}

function getFixtureDate(home, away) {
  const group = getOpponentGroup(home, away);
  if (!group) return null;

  const isHome = home.toLowerCase().includes("portsmouth");

  return isHome ? homeDates[group] : awayDates[group];
}

async function fetchMatches() {
  const url =
    "https://www.uduk.co.uk/api/trpc/tournament.page?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22tournamentId%22%3A%22south_2526%22%2C%22paginationInputs%22%3A%7B%22matchdays%22%3A%7B%22index%22%3A0%2C%22size%22%3A5%7D%2C%22fixtures%22%3A%7B%22index%22%3A0%2C%22size%22%3A5%7D%7D%7D%7D%7D";
  const res = await fetch(url);
  const full = await res.json();

  const teams = full?.[0]?.result?.data?.json?.teams;

    const portsmouthA = teams.find(t =>
      t.name.toLowerCase().includes("portsmouth a")
    );

    const portsmouthB = teams.find(t =>
      t.name.toLowerCase().includes("portsmouth b")
    );

    const teamMap = Object.fromEntries(
      teams.map(t => [t.id, t.name])
    );

 const prettyFixturesA = portsmouthA.fixtures.map(f => {
    const home = teamMap[f.homeTeamId];
    const away = teamMap[f.awayTeamId];

    return {
      homeTeam: home,
      awayTeam: away,
      homeWins: f.homeWins,
      awayWins: f.awayWins,
      outcome: f.outcome,
      date: getFixtureDate(home, away)
    };
  });

  const prettyFixturesB = portsmouthB.fixtures.map(f => {
    const home = teamMap[f.homeTeamId];
    const away = teamMap[f.awayTeamId];

    return {
      homeTeam: home,
      awayTeam: away,
      homeWins: f.homeWins,
      awayWins: f.awayWins,
      outcome: f.outcome,
      date: getFixtureDate(home, away)
    };
  });

    const allFixtures = [...prettyFixturesA, ...prettyFixturesB]

    allFixtures.sort((a, b) => new Date(a.date) - new Date(b.date));

    const uniqueFixtures = [];
    const seen = new Set();

    for (const f of allFixtures) {
      const key = `${f.homeTeam}-${f.awayTeam}-${f.date}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueFixtures.push(f);
      }
    }

    fs.writeFileSync("matches.json", JSON.stringify(uniqueFixtures, null, 2));

    console.log("Matches Updated")
}



fetchMatches();
