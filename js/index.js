// Globale varibler
const gamesContainer = document.getElementById("games_container");
const searchForm = document.getElementById("search_for_games");
const searchInput = document.getElementById("search_input");
const genreFilter = document.getElementById("genre");
const showLessButton = document.getElementById("show_less");
const showMoreButton = document.getElementById("show_more");

// addEventListenere til knapper
searchInput.addEventListener("input", performSearch);
genreFilter.addEventListener("change", filterGames);
showLessButton.addEventListener("click", showLessGames);
showMoreButton.addEventListener("click", showMoreGames);


// styling for globale variabler
gamesContainer.style.display = "flex";
gamesContainer.style.flexWrap = "wrap";
gamesContainer.style.justifyContent = "center";
gamesContainer.style.gap = "2rem";
gamesContainer.style.margin = "30px";
gamesContainer.style.maxHeight = "59vh";
gamesContainer.style.overflowY = "auto";


// Api
const apiKey = "e14d894ca94643c489dcbb1a5f660d26";
let currentPage = 1;
let allGames = [];

// Async funksjon for å hente spilldata fra API
async function fetchAndDisplay(searchedGames = "",fromPage = 1) {
    let url = `https://api.rawg.io/api/games?key=${apiKey}&page=${fromPage}&page_size=40`;
    if (searchedGames) {
        url += `&search=${searchedGames}`;
    }
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch games. Please try again later.");
        }
        const data = await res.json();
        console.log(data.results);
        return data.results;
    } catch (error) {
        console.error("Something went wrong when getting games", error);
        return [];
    }
}

async function displayAllGames() {
    try {
        allGames = await fetchAndDisplay("", currentPage);
        if (currentPage <= 1) {
            showLessButton.style.display = "none";
        } else {
            showLessButton.style.display = "block";
        }
        updateDisplayGames(allGames);
    } catch (error) {
        console.error("Error fetching games:", error);
    }
}

// Funksjon for å lage elementer for hvert spill
function GameDetails(game) {
    const createGameDiv = document.createElement("div");
    createGameDiv.classList.add("game_elements");
    gamesContainer.appendChild(createGameDiv);

    // Spill navn
    const createGameName = document.createElement("div");
    createGameName.classList.add("game_name");
    createGameDiv.appendChild(createGameName);

    const indexOfColon = game.name.indexOf(":");
    if (indexOfColon !== -1) {
        const [firstPart, secondPart] = game.name.split(":").map(part => part.trim());
        const firstPartElement = document.createElement("h2");
        firstPartElement.classList.add("first_gameName"); 
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
    showGameInfo.innerText = "Enter";
    createGameDiv.appendChild(showGameInfo);

    // styling
    // spill div
    createGameDiv.style.border = "3px solid white";
    createGameDiv.style.borderRadius = "20px";
    createGameDiv.style.backgroundColor = "#423f2f";

    //bilde
    createImage.style.width = "300px";
    createImage.style.height = "170px";

    // rating
    createRating.style.fontSize = "20px";
    createRating.style.fontWeight = "bold";

    // Spill informasjon
    showGameInfo.style.fontSize = "25px"
    showGameInfo.style.fontWeight = "bold"
    showGameInfo.style.color = "red"

    showGameInfo.style.display = "none";
    

    // hover-effekt
    createGameDiv.addEventListener("mouseover", function () {
        showGameInfo.style.display = "block";
        createGameDiv.style.backgroundColor = "#323f2f"; 
    });

    // Fjern hover-effekten
    createGameDiv.addEventListener("mouseout", function () {
        createGameDiv.style.backgroundColor = "#423f2f";
        showGameInfo.style.display = "none";
    });

    // Legg til en klikk-lytter på spilldiven
    createGameDiv.addEventListener("click", function () {
        goToGameInfo(game.id);
    });

    return createGameDiv;
}

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    performSearch();
});

async function performSearch() {
    const searched = searchInput.value.trim();
    if (searched) {
        [showMoreButton, showLessButton].forEach(element => {
            element.style.display = "none";
        });        
        const searchedGames = await fetchAndDisplay(searched);
        updateDisplayGames(searchedGames, gamesContainer);
    } else {
        searchInput.placeholder = "Please enter a game name";
    }
}

async function filterGames() {
    [showMoreButton, showLessButton].forEach(button => {
        button.style.display = "none";
    });
    
    
    let filtredGames = "";

    const genreValue = genreFilter.value;
    if (genreValue) {
        filtredGames += `&genres=${genreValue}`;
    }

    // Henter spill basert på de valgte kriteriene
    const games = await fetchAndDisplay(filtredGames);
    console.log(games);
    updateDisplayGames(games);
}

// Funksjon for å oppdatere visningen av spill
function updateDisplayGames(games) {
    if (games.length === 0) {
        gamesContainer.innerHTML = "No games found.";
    } else {
        gamesContainer.innerHTML = "";
        games.forEach(game => {
            const gameElement = GameDetails(game);
            gamesContainer.appendChild(gameElement);
        });
    }
}

// side navigering
function showLessGames() {
    currentPage--;
    if (currentPage < 1) {
        currentPage = 1;
    }
    displayAllGames();
}

function showMoreGames() {
    currentPage++;
    displayAllGames();
}

// overføring
function goToGameInfo(gameId) {
    const infoPage = `game-info.html?gameId=${gameId}`;
    location.href = infoPage;
}

displayAllGames();