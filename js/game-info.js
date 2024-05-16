// *Globale variabler
// Lyttere for to knapper å navigere til sider
document.getElementById("chooseAnotherBtn").onclick = function () {
    location.href = "./index.html";
};
document.getElementById("myCollectionBtn").onclick = function () {
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

    // Beskrivelse
    const createDescription = document.createElement("p");
    createDescription.classList.add("game_describe");
    // Fjerner den spanske delen av beskrivelsen
    const englishDescription = game.description.split("<p>Español")[0];
    createDescription.innerHTML = englishDescription;
    gameContainer.appendChild(createDescription);


    // Sjangree
    const createGenres = document.createElement("p");
    createGenres.classList.add("game_genres");
    createGenres.textContent = `Genres: ${game.genres.map(genre => genre.name).join(", ")}`;
    gameContainer.appendChild(createGenres);

    // Utgivelse
    const createReleased = document.createElement("p");
    createReleased.classList.add("game_released");
    createReleased.textContent = `Released: ${game.released}`;
    gameContainer.appendChild(createReleased);

    //Platform
    const createPlatform = document.createElement("p");
    createPlatform.classList.add("game_platform");
    createPlatform.textContent = `Platforms: ${game.platforms.map(platform => platform.platform.name).join(", ")}`;
    gameContainer.appendChild(createPlatform);

    //Vurdering
    const createRating = document.createElement("p");
    createRating.classList.add("game_rating");
    createRating.textContent = `Rating: ${game.rating} out of ${game.rating_top}`;
    gameContainer.appendChild(createRating);

    // Metacritic
    const createMetacritic = document.createElement("p");
    createMetacritic.classList.add("game_metacritic");
    createMetacritic.textContent = `Metacritic Score: ${game.metacritic}`;
    gameContainer.appendChild(createMetacritic);

    // Butikker som selger
    const createStores = document.createElement("p");
    createStores.classList.add("game_stores");
    createStores.textContent = `Where to buy: ${game.stores.map(store => store.store.name).join(", ")}`;
    gameContainer.appendChild(createStores);

    // Spill tags
    const createTags = document.createElement("p");
    createTags.classList.add("game_tags");
    createTags.textContent = `Tags: ${game.tags.map(tag => tag.name).join(", ")}`;
    gameContainer.appendChild(createTags);

    // lytter til knappen
    const addToCollectionBtn = document.getElementById("addToCollectionBtn");
    addToCollectionBtn.addEventListener("click", addToCollection);

    // Sjekker om brukeren er logget inn
    function addToCollection() {
        const userName = localStorage.getItem("userName");
        if (!userName) {
            alert("You must be logged in to add a game to your collection.");
            return;
        }

        saveGameLocally(game, userName);
        saveGameApi(game)
        
        // fjerner lytter etter den er brukt
        addToCollectionBtn.removeEventListener("click", addToCollection);
    }
}

// funksjon for å lagre lokalt
function saveGameLocally(game, userName) {
    const data = {
        "name": game.name,
        "image": game.background_image,
        "description": game.description,
        "genres": game.genres.map(genre => genre.name),
        "released": game.released,
        "platforms": game.platforms.map(platform => platform.platform.name),
        "rating": game.rating,
        "rating_top": game.rating_top,
        "metacritic": game.metacritic,
        "stores": game.stores.map(store => store.store.name),
        "tags": game.tags.map(tag => tag.name)
    };

    let userData = JSON.parse(localStorage.getItem(userName)) || [];
    userData.push(data);
    localStorage.setItem(userName, JSON.stringify(userData));

    if (localStorage.getItem(userName)) {
        console.log("Game added to your game collection!");
        alert("Game added to your game collection!")
    } else {
        console.log("Something went wront. Game not added to your collection!");
        alert("Something went wront. Game not added to your collection!")
    }
}

// Funskjon for å lagre i Api, post metode
async function saveGameApi(game) {
    try {
        const apiUrl = "https://crudapi.co.uk/api/v1/game-info";
        const token = "ke8k5JJTgj6rskLTa0qZNaLIIW7LIbtUTw2vojGVCcPNirYdvQ";

        const data = [{
            "name": game.name,
            "image": game.background_image,
            "description": game.description,
            "genres": game.genres.map(genre => genre.name),
            "released": game.released,
            "platforms": game.platforms.map(platform => platform.platform.name),
            "rating": game.rating,
            "rating_top": game.rating_top,
            "metacritic": game.metacritic,
            "stores": game.stores.map(store => store.store.name),
            "tags": game.tags.map(tag => tag.name)
        }];

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to post game details to API');
        }

        const responseData = await response.json();
        console.log('Game details sent to API:', responseData);
    } catch (error) {
        console.error('Error sending game details to API:', error.message);
        alert('Sending game details failed! ' + error.message);
    }
}

// Lytter til knappen og viderefører til neste side
document.getElementById("SavedInfoBtn").addEventListener("click", function () {
    location.href = "./my-collection.html";
});

displayGameDetails(gameId);