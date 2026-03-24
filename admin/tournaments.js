function goToKnockouts() {
    const count = document.getElementById("player-count").value;

    if (!count || count < 2) {
        alert("Enter number of players first");
        return;
    }

    window.location.href = `/admin/knockouts.html?players=${count}`;
}
