const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
editModal.style.display = "none";

let editGame = null; // Varibel med tom tilstad // redigerer spillinformasjon basert på spillets navn
const apiUrl = "https://crudapi.co.uk/api/v1/game-info";
const token = "ke8k5JJTgj6rskLTa0qZNaLIIW7LIbtUTw2vojGVCcPNirYdvQ";

// Funksjon for å vise spillkolleksjonen
async function gameDataApi() {
    try {
        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch game collection from API');
        }

        const data = await res.json();
        gameContainerr.innerHTML = ''; // Tøm eksisterende innhold
        data.items.forEach(game => {
            console.log(data);
            gameCollection(game);
        });
    } catch (error) {
        console.error('Error fetching game collection from API:', error.message);
        alert('Fetching game collection failed! ' + error.message);
    }
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

gameDataApi();