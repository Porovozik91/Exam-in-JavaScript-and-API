// Globalt js fil som sjekker om brukeren er logget inn bassert på user data som er lagret localt local localStorage

const mainTag = document.querySelector("main");
const userName = localStorage.getItem("userName");
const accountLink = document.getElementById("accountLink");

// brukernavnet i navigasjonsmenyen
if (userName) {
    accountLink.innerHTML = `Welcome ${userName}`;
    const logOutBtn = document.createElement("button");
    logOutBtn.classList.add("logOutBtn");
    logOutBtn.innerHTML = "Log Out";
    logOutBtn.addEventListener("click", logout); 
    accountLink.appendChild(logOutBtn);

    // style
    accountLink.style.fontSize = "22px";


    // for log ut knappen
    logOutBtn.style.marginLeft = "20px";
    logOutBtn.style.padding = "5px";
    logOutBtn.style.fontSize = "18px";
    logOutBtn.style.fontWeight = "bold";
    logOutBtn.style.backgroundColor = "white";
    logOutBtn.style.borderRadius = "10px";

    logOutBtn.addEventListener("mouseenter", function () {
        logOutBtn.style.backgroundColor = "#95ed7f";
    });

    logOutBtn.addEventListener("mouseleave", function () {
        logOutBtn.style.backgroundColor = "white";
    });
    


} else {
    // påminnelse om å logge inn
    accountLink.innerHTML = '<a href="./account.html">Log in</a>';
    const warning = document.createElement('p');
    warning.style.background = 'red';
    warning.style.color = 'white';
    warning.style.padding = '10px';
    warning.style.textAlign = "center";
    warning.textContent = 'You are not logged in. Please log in to access your account.';
    mainTag.insertBefore(warning, mainTag.firstChild);
    collectionList.style.display = "none"; 
}

// funksjon for å logge ut
function logout() {
    localStorage.removeItem("userName"); 
    location.href = "index.html"; 
}
