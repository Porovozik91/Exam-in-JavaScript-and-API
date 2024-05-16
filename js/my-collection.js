
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
editModal.style.display = "none";

let editGame = null; // For å lagre navnet på spillet som redigeres

// Funksjon for å vise spillkolleksjonen
function displayCollection() {
    const userName = localStorage.getItem("userName");
    const storedDataLocalStorage = JSON.parse(localStorage.getItem(userName)) || [];
    gameContainerr.innerHTML = "";
    storedDataLocalStorage.forEach(game => {
        console.log(game);
    });
}

displayCollection();