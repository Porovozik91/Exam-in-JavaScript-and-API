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

      // navn
      const name = document.createElement("h3");
      name.textContent = game.name;
      name.classList.add("game_title");
      gameInfo.appendChild(name);

    //  bilde
    const image = document.createElement("img");
    image.src = game.image;
    image.alt = game.name;
    image.classList.add("game_image");
    gameInfo.appendChild(image);


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
}