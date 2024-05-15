// Lytter lytter etter loginForm submit og henter data fra api endepunktet
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch(`https://crudapi.co.uk/api/v1/userdata?email=${encodeURIComponent(email)}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer ke8k5JJTgj6rskLTa0qZNaLIIW7LIbtUTw2vojGVCcPNirYdvQ",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        const user = responseData.items.find((user) => user.email === email);

        if (user && user.password === password) {
            console.log("Login successful:", user);
            alert("Login successful!");
            localStorage.setItem("userName", user.name);
            location.href = "./index.html";
        } else {
            throw new Error("Email or password does not match");
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed! " + error.message);
    }
});
