// *Globale variabler
// Lyttere for to knapper å navigere til sider
document.getElementById("chooseAnotherBtn").onclick = function() {
    location.href = "./index.html";
};
document.getElementById("myCollectionBtn").onclick = function() {
    window.location.href = "./my-collection.html";
};

const gameContainer = document.getElementById("game_details_container");
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
        //console.log(data);
        GameDetails(data);
    } catch (error) {
        console.error("Error fetching game details:", error);
    }
}

function GameDetails(game) {

    // Navn
    const createGameName = document.createElement("h2");
    createGameName.classList.add("game_name");
    createGameName.textContent = game.name;
    gameContainer.appendChild(createGameName);

    // Bilde
    const createImage = document.createElement("img");
    createImage.classList.add("game_image")
    createImage.src = game.background_image;
    createImage.alt = game.name;
    gameContainer.appendChild(createImage);

    const createDescription = document.createElement("p");
    createDescription.classList.add("game_describe")
    createDescription.innerHTML = game.description;
    gameContainer.appendChild(createDescription);

    const createGenres = document.createElement("p");
    createGenres.classList.add("game_genres");
    createGenres.textContent = `Genres: ${game.genres.map(genre => genre.name).join(", ")}`;
    gameContainer.appendChild(createGenres);

    const createReleased = document.createElement("p");
    createReleased.classList.add("game_released");
    createReleased.textContent = `Released: ${game.released}`;
    gameContainer.appendChild(createReleased);

    const createPlatform = document.createElement("p");
    createPlatform.classList.add("game_platform");
    createPlatform.textContent = `Platforms: ${game.platforms.map(platform => platform.platform.name).join(", ")}`;
    gameContainer.appendChild(createPlatform);

    const createRating = document.createElement("p");
    createRating.classList.add("game_rating");
    createRating.textContent = `Rating: ${game.rating} out of ${game.rating_top}`;
    gameContainer.appendChild(createRating);

    const createMetacritic = document.createElement("p");
    createMetacritic.classList.add("game_metacritic");
    createMetacritic.textContent = `Metacritic Score: ${game.metacritic}`;
    gameContainer.appendChild(createMetacritic);

    const createStores = document.createElement("p");
    createStores.classList.add("game_stores");
    createStores.textContent = `Where to buy: ${game.stores.map(store => store.store.name).join(", ")}`;
    gameContainer.appendChild(createStores);

    const createTags = document.createElement("p");
    createTags.classList.add("game_tags");
    createTags.textContent = `Tags: ${game.tags.map(tag => tag.name).join(", ")}`;
    container.appendChild(createTags);
}

displayGameDetails(gameId);