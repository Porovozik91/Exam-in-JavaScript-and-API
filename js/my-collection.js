const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
editModal.style.display = "none";

let editGame = null; // Varibel med tom tilstad // redigerer spillinformasjon basert på spillets navn

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

      //  Edit-knapp 
      if (game.name && game.image && game.genres && game.released && game.rating && game.rating_top && game.metacritic && game.platforms && game.stores && game.tags) {
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        // Lytter til knappen og oppdaterer skjemafeltene med spillinformasjon for redigering
        editButton.addEventListener("click", () => {
            document.getElementById("editName").value = game.name;
            document.getElementById("editImage").value = game.image;
            document.getElementById("editGenres").value = game.genres.join(", ");
            document.getElementById("editReleased").value = game.released;
            document.getElementById("editRating").value = game.rating;
            document.getElementById("editRatingTop").value = game.rating_top;
            document.getElementById("editMetacritic").value = game.metacritic;
            document.getElementById("editPlatforms").value = game.platforms.join(", ");
            document.getElementById("editStores").value = game.stores.join(", ");
            document.getElementById("editTags").value = game.tags.join(", ");

            //
            editGame = game.name; // redigerer spillinformasjon basert på spillets navn

            // Vis redigeringsmodulen
            editModal.style.display = "block";
        });
        gameInfo.appendChild(editButton);
    }

    //  sletteknapp
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        removeGameLocally(game.name);
    });
    gameInfo.appendChild(deleteButton);
}

// Lukk modalt vindu når brukeren klikker på lukkeknappen
document.querySelector('.close').addEventListener('click', function() {
    editModal.style.display = "none";
});

// Finner indeksen til spillet
function findGameIndex(gameName) {
    const userName = localStorage.getItem("userName");
    const gameList = JSON.parse(localStorage.getItem(userName)) || [];
    return gameList.findIndex(game => game.name === gameName);
}

// Redigere og lagre endringer localt i local storage
editForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const editedName = document.getElementById("editName").value;
    const editedImage = document.getElementById("editImage").value;
    const editedGenres = document.getElementById("editGenres").value.split(", ");
    const editedReleased = document.getElementById("editReleased").value;
    const editedRating = parseFloat(document.getElementById("editRating").value);
    const editedRatingTop = parseFloat(document.getElementById("editRatingTop").value);
    const editedMetacritic = parseFloat(document.getElementById("editMetacritic").value);
    const editedPlatforms = document.getElementById("editPlatforms").value.split(", ");
    const editedStores = document.getElementById("editStores").value.split(", ");
    const editedTags = document.getElementById("editTags").value.split(", ");

    // Finn spillet i samlingen og oppdater dataene
    const gameIndex = findGameIndex(editGame);
    if (gameIndex !== -1) {
        const userName = localStorage.getItem("userName");
        const gameList = JSON.parse(localStorage.getItem(userName)) || [];
        const game = gameList[gameIndex];
        game.name = editedName;
        game.image = editedImage;
        game.genres = editedGenres;
        game.released = editedReleased;
        game.rating = editedRating;
        game.rating_top = editedRatingTop;
        game.metacritic = editedMetacritic;
        game.platforms = editedPlatforms;
        game.stores = editedStores;
        game.tags = editedTags;
        localStorage.setItem(userName, JSON.stringify(gameList)); // Oppdater lokal lagring med den oppdaterte spilllisten
    }

    // Oppdater visningen av navnet i samlingen
    const gameTitleElement = document.querySelector(`[data-game-name="${editGame}"] .game-title`);
    if (gameTitleElement) {
        gameTitleElement.textContent = editedName;
    }

    // Lukk redigeringsmodalen
    editModal.style.display = "none";

    // Oppdater visningen av samlingen
    displayCollection();
});

// Funksjon som fjerner spillet fra lokal lagring
function removeGameLocally(gameName) {
    const userName = localStorage.getItem("userName");
    const gameList = JSON.parse(localStorage.getItem(userName)) || [];
    const gameIndex = findGameIndex(gameName);
    if (gameIndex !== -1) {
        gameList.splice(gameIndex, 1);
        localStorage.setItem(userName, JSON.stringify(gameList)); 
        displayCollection();
    }
}

displayCollection();