// Globale varibler
const gamesContainer = document.getElementById("games_container");


// styling for globale variabler
gamesContainer.style.display = "flex";
gamesContainer.style.flexWrap = "wrap";
gamesContainer.style.justifyContent = "center";
gamesContainer.style.gap = "2rem";
gamesContainer.style.padding = "40px";
gamesContainer.style.margin = "30px";


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

    // for viderføring
    createGameDiv.id = `game-${game.id}`;

  // Spill navn
const createGameName = document.createElement("div");
createGameName.classList.add("game_name");
createGameDiv.appendChild(createGameName);

const indexOfColon = game.name.indexOf(':');
if (indexOfColon !== -1) {
    const [firstPart, secondPart] = game.name.split(':').map(part => part.trim());
    const firstPartElement = document.createElement("h2");
    firstPartElement.classList.add('first_gameName'); 
    firstPartElement.textContent = firstPart;
    const secondPartElement = document.createElement("h3");
    secondPartElement.classList.add("second_gameName"); 
    secondPartElement.textContent = secondPart;
    createGameName.appendChild(firstPartElement);
    createGameName.appendChild(secondPartElement);
} else {
    createGameName.textContent = game.name;
}

    // Spill bilde
    const createImage = document.createElement("img");
    createImage.classList.add("game_image");
    createImage.src = game.background_image;
    createImage.alt = game.name;
    createGameDiv.appendChild(createImage);


    // Spill vurdering
    const createRating = document.createElement("p");
    createRating.classList.add("game_rating")
    createRating.textContent = `Rating: ${game.rating} out of ${game.rating_top}`;
    createGameDiv.appendChild(createRating);

    // Spill informasjon
    const showGameInfo = document.createElement("p");
    showGameInfo.classList.add("show_game_info");
    showGameInfo.innerText = "Show more";
    createGameDiv.appendChild(showGameInfo);




    // styling
    // spill div
    createGameDiv.style.border = "1px solid #ccc";
    createGameDiv.style.borderRadius = "8px";
    createGameDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    createGameDiv.style.backgroundColor = "#fff";

    //bilde
    createImage.style.width = "300px";
    createImage.style.height = "170px";


    // Spill informasjon
    showGameInfo.style.display = "none";
    createRating.style.fontSize = "20px";
    createRating.style.fontWeight = "bold";

    

    // hover-effekt
    createGameDiv.addEventListener("mouseover", function () {
        showGameInfo.style.display = "block";
        createGameDiv.style.backgroundColor = "#f0f0f0"; 
    });

    // Fjern hover-effekten
    createGameDiv.addEventListener("mouseout", function () {
        createGameDiv.style.backgroundColor = "#fff";
        showGameInfo.style.display = "none";
    });

    // Legg til en klikk-lytter på spilldiven
    createGameDiv.addEventListener("click", function () {
        handleGameClick(game.id);
    });

    return createGameDiv;
}

function handleGameClick(gameId) {
    const infoPage = `game-info.html?gameId=${gameId}`; 

    // Viderekoble til den andre siden
    location.href = infoPage;
}

// funksjon for å itere gjennom spillene og kalle gameElements for hvertspill
function updateDisplayGames(games) {
    games.forEach(game => {
        gameElements(game, gamesContainer);
    });
}

fetchAndDisplay()