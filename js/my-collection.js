const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
editModal.style.display = "none";



// Funksjon for å vise spillkolleksjonen
function displayCollection() {
    const userName = localStorage.getItem("userName");
    const storedDataLocalStorage = JSON.parse(localStorage.getItem(userName)) || [];
    gameContainerr.innerHTML = "";
    storedDataLocalStorage.forEach(game => {
        console.log(game);
        gameCollection(game);
    });
}

// Funksjon for å legge til et spill i samlingen
function gameCollection(game) {
    const gameInfo = document.createElement("div");
    gameInfo.classList.add("game_div");
    gameContainerr.appendChild(gameInfo);

    //  bilde
    const image = document.createElement("img");
    image.style.width = "200px";
    image.src = game.image;
    image.alt = game.name;
    image.classList.add("game_image");
    gameInfo.appendChild(image);

    //  tittel
    const name = document.createElement("h3");
    name.textContent = game.name;
    name.classList.add("game_title");
    gameInfo.appendChild(name);

    //  sjangre
    const genres = document.createElement("p");
    genres.textContent = `Genres: ${game.genres.join(", ")}`;
    genres.classList.add("game_genres");
    gameInfo.appendChild(genres);

    //  utgivelsesdato
    const released = document.createElement("p");
    released.textContent = `Released: ${game.released}`;
    released.classList.add("game_released");
    gameInfo.appendChild(released);

    //  vurdering
    const rating = document.createElement("p");
    rating.textContent = `Rating: ${game.rating} out of ${game.rating_top}`;
    rating.classList.add("game_rating");
    gameInfo.appendChild(rating);

    //  metacritic
    const metacritic = document.createElement("p");
    metacritic.textContent = `Metacritic Score: ${game.metacritic}`;
    metacritic.classList.add("game_metacritic");
    gameInfo.appendChild(metacritic);

    //  plattformer
    const platforms = document.createElement("p");
    platforms.textContent = `Platforms: ${game.platforms.join(", ")}`;
    platforms.classList.add("game_platforms");
    gameInfo.appendChild(platforms);

    //  butikker
    const stores = document.createElement("p");
    stores.textContent = `Where to buy: ${game.stores.join(", ")}`;
    stores.classList.add("game_stores");
    gameInfo.appendChild(stores);

    //  tagger
    const tags = document.createElement("p");
    tags.textContent = `Tags: ${game.tags.join(", ")}`;
    tags.classList.add("game_tags");
    gameInfo.appendChild(tags);

    //  sletteknapp
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        removeGameLocally(game.name);
    });
    gameInfo.appendChild(deleteButton);
}

// Finner indeksen til spillet
function findGameIndex(gameName) {
    const userName = localStorage.getItem("userName");
    const gameList = JSON.parse(localStorage.getItem(userName)) || [];
    return gameList.findIndex(game => game.name === gameName);
}

// Funksjon som fjerner spillet fra lokal lagring
function removeGameLocally(gameName) {
    const userName = localStorage.getItem("userName");
    const gameList = JSON.parse(localStorage.getItem(userName)) || [];
    const gameIndex = findGameIndex(gameName);
    if (gameIndex !== -1) {
        gameList.splice(gameIndex, 1);
        localStorage.setItem(userName, JSON.stringify(gameList)); // Oppdater local storage
        displayCollection();
    }
}

displayCollection();