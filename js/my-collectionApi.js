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
            throw new Error("Failed to fetch game collection from API");
        }

        const data = await res.json();
        gameContainerr.innerHTML = "";
        data.items.forEach(game => {
            console.log(data);
            gameCollection(game);
        });
    } catch (error) {
        console.error("Error fetching game collection from API:", error.message);
        alert("Fetching game collection failed! " + error.message);
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


    // redigering
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
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

        editGame = game._uuid;
        editModal.style.display = "block"; 
    });
    gameInfo.appendChild(editButton);

      // sletter spill fra endepunktet
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", async () => {
          if (confirm(`Are you sure you want to delete ${game.name}?`)) {
              try {
                  const res = await fetch(`https://crudapi.co.uk/api/v1/game-info/${game._uuid}`, {
                      method: "DELETE",
                      headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
                      }
                  });
  
                  if (!res.ok) {
                      throw new Error("Failed to delete game");
                  }
  
                  // Fjern spillet fra siden
                  gameInfo.remove();
              } catch (error) {
                  console.error("Error deleting game:", error.message);
                  alert("Deleting game failed! " + error.message);
              }
          }
      });
      gameInfo.appendChild(deleteButton);
}

// endrer spill informasjon i api
editForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const formData = new FormData(editForm);
    const editedGame = {
        name: formData.get("editName"),
        image: formData.get("editImage"),
        genres: formData.get("editGenres").split(",").map(genre => genre.trim()),
        released: formData.get("editReleased"),
        rating: parseFloat(formData.get("editRating")),
        rating_top: parseFloat(formData.get("editRatingTop")),
        metacritic: parseInt(formData.get("editMetacritic"), 10),
        platforms: formData.get("editPlatforms").split(",").map(platform => platform.trim()),
        stores: formData.get("editStores").split(",").map(store => store.trim()),
        tags: formData.get("editTags").split(",").map(tag => tag.trim())
    };

    try {
        const res = await fetch(`https://crudapi.co.uk/api/v1/game-info/${editGame}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(editedGame)
        });

        if (!res.ok) {
            throw new Error("Failed to update game");
        }

        // Lukker modalen og oppdater samlingen
        editModal.style.display = "none";
        gameDataApi();
    } catch (error) {
        console.error("Error updating game:", error.message);
        alert("Updating game failed! " + error.message);
    }
});

// lukker modalen
document.querySelector(".close").addEventListener("click", () => {
    editModal.style.display = "none";
});

gameDataApi();