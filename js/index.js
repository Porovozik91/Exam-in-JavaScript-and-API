// Globale varibler
const gamesContainer = document.getElementById("games_container");


// styling for globale variabler
gamesContainer.style.display = "flex";
gamesContainer.style.flexWrap = "wrap";
gamesContainer.style.justifyContent = "center";
gamesContainer.style.gap = "2rem";

// Api
const apiKey = "e14d894ca94643c489dcbb1a5f660d26";
const url = `https://api.rawg.io/api/games?key=${apiKey}`;

// Async await funksjon for fecthe api med get/ Henter spill data
async function fetchAndDisplay() {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Network status not ok")
        }
        const gameData = await res.json();
        console.log(gameData.results);
        updateDisplayGames(gameData.results);
    } catch (err) {
        console.error("Something went wron when getting games", err)
    }
}



// Funksjon: lager lokale variabler. Elementer for spill info
function gameElements(game, gamesContainer) {
    //div element for spill informasjon
    const createGameDiv = document.createElement("div");
    createGameDiv.classList.add("game_elements");
    gamesContainer.appendChild(createGameDiv);

    // Spill navn
    const createGameName = document.createElement("h2");
    createGameName.classList.add("game_name");
    createGameName.textContent = game.name;
    createGameDiv.appendChild(createGameName);
  

    // Spill bilde
    const createImage = document.createElement("img");
    createImage.classList.add("game_image");
    createImage.src = game.background_image;
    createImage.alt = game.name;
    createGameDiv.appendChild(createImage);
   

    // Spill vurdering
    const createRating = document.createElement('p');
    createRating.classList.add("game_rating")
    createRating.textContent = `Rating: ${game.rating} out of ${game.rating_top}`;
    createGameDiv.appendChild(createRating);
    

    // styling
    //bilde
    createImage.style.width = "300px";
    createImage.style.height = "170px";

    return createGameDiv;
}

// funksjon for å itere gjennom spillene og kalle gameElements for hvertspill
function updateDisplayGames(games) {
    games.forEach(game => {
        gameElements(game, gamesContainer);
    });
}

fetchAndDisplay()