
        // switcher knapper ved å skjule ikke valgt knappen
        function changeForm(loginForm, signupSection) {
            document.getElementById(loginForm).style.display = "block";
            document.getElementById(signupSection).style.display = "none";
        }
    
        // Styling

        // body
        document.body.style.height = "100vh";
    
        //main
        const main = document.querySelector("main");
        main.style.display = "flex";
        main.style.flexDirection = "column";
        main.style.alignItems = "center";
    
        //autoresetion
        const autoresetion = document.querySelector(".autoresetion");
        autoresetion.style.width = "400px";
        autoresetion.style.marginTop = "10%";
        autoresetion.style.border = "solid #218838";
        autoresetion.style.borderRadius = "20px";
    
        //loginForm- og signupForm
        const loginForm = document.getElementById("loginForm");
        const signupForm = document.getElementById("signupForm");
        loginForm.style.padding = "30px";
        loginForm.style.display = "flex";
        loginForm.style.alignItems = "center";
        loginForm.style.flexDirection = "column";
        loginForm.style.gap = "20px";
        signupForm.style.padding = "30px";
        signupForm.style.display = "flex";
        signupForm.style.alignItems = "center";
        signupForm.style.flexDirection = "column";
        signupForm.style.gap = "20px";
    
        //input-label
        const inputLabels = document.querySelectorAll(".input label");
        inputLabels.forEach(label => {
            label.style.display = "flex";
            label.style.paddingTop = "20px";
            label.style.paddingBottom = "10px";
            label.style.justifyContent = "flex-start";
            label.style.color = "white";
            label.style.fontSize = "25px";
        });
    
        //input
        const inputs = document.querySelectorAll(".input input");
        inputs.forEach(input => {
            input.style.display = "flex";
            input.style.height = "30px";
            input.style.width = "300px";
            input.style.fontSize = "20px";
            input.style.fontWeight = "bold";
            input.style.paddingLeft = "10px";
        });
    
        //h4
        const h4 = document.querySelectorAll("h4");
        h4.forEach(h4 => {
            h4.style.color = "white";
            h4.style.fontSize = "25px";
        });
    
        //switch_section
        const switchSection = document.querySelector(".switch_section");
        switchSection.style.display = "flex";
        switchSection.style.justifyContent = "center";
        switchSection.style.paddingTop = "30px";
    
        //button
        const buttons = document.querySelectorAll("button");
        buttons.forEach(button => {
            button.style.padding = "10px 20px";
            button.style.fontSize = "16px";
            button.style.cursor = "pointer";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.backgroundColor = "#363cab";
            button.style.color = "#fff";
            button.style.transition = "background-color 0.3s ease";
        });
    
        //hover-effekten til button
        buttons.forEach(button => {
            button.addEventListener("mouseenter", function() {
                button.style.backgroundColor = "#218838";
            });
            button.addEventListener("mouseleave", function() {
                button.style.backgroundColor = "#363cab";
            });
        });