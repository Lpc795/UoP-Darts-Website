// Show the setup form when Knockouts is clicked
function showKnockoutSetup() {
document.getElementById("knockout-setup").style.display = "block";
}

// Handle the form submission
function submitKnockoutSetup() {
const players = document.getElementById("player-count").value;
const losers = document.getElementById("losers-bracket").value;

if (!players) {
  alert("Please enter the number of players.");
  return;
}

// Redirect to next step (or load dynamically)
window.open(`/admin/knockouts?players=${players}&losers=${losers}`, "_blank");
}
