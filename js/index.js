// Globale varibler
const gameContainer = document.getElementById("games_container"); 




// Api
const apiKey = "e14d894ca94643c489dcbb1a5f660d26";
const url = `https://api.rawg.io/api/games?key=${apiKey}`;

// Async await funksjon for fecthe api med get/ Henter spill data
async function allGamesData(){
    try{
        const res = await fetch(url); 
        if (!res.ok){
            throw new Error("Network status not ok")
        }
        const gameData = await res.json();
        console.log(gameData.results);
        return gameData.results;
    } catch (err){
        console.error("Something went wron when getting games", err)
    }
}
allGamesData()

// Funksjon: lager lokale variabler. Elementer for spill info
function gameElements(game, gameContainer){
    
}