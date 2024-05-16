// *Globale variabler
// Lyttere for to knapper å navigere til sider
document.getElementById("chooseAnotherBtn").onclick = function() {
    location.href = "./index.html";
};
document.getElementById("myCollectionBtn").onclick = function() {
    window.location.href = "./my-collection.html";
};

const container = document.getElementById("game_details_container");
// Henter game id i parameterverdien fra søkestrengen
const urlParams = new URLSearchParams(location.search);
const gameId = urlParams.get("gameId");

// Fetcher API som henter spillinformasjon basert på valgte spill i index siden
async function displayGameDetails(gameId) {
    const apiKey = "e14d894ca94643c489dcbb1a5f660d26";
    const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching game details:", error);
    }
}

displayGameDetails();