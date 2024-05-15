// Lytter etter skjemainnsending og sender data asynkront til API-endepunktet.
document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // ved skjemainnsending
    const userData = [{
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }];

    console.log("Sending registration data:", JSON.stringify(userData));

    try {
        const response = await fetch("https://crudapi.co.uk/api/v1/userdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer ke8k5JJTgj6rskLTa0qZNaLIIW7LIbtUTw2vojGVCcPNirYdvQ"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Registration successful:", data);
        alert("Registration successful!");
    } catch (error) {
        console.error("There was a problem with the registration process:", error);
        alert("Registration failed! " + error.message);
    }
});
