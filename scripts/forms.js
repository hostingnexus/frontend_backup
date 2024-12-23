document.addEventListener("DOMContentLoaded", function() {
    const login = document.getElementById("login");
    if(login != null) {
        login.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if(email == "" || password == "") {
                alert("Please fill in all fields");
                return;
            }

            fetch("http://localhost:3000/login", {method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({email, password})}).then(res => res.json())
            .then(data => {
                if(data.success) {
                    localStorage.setItem("token", data.session);
                    window.location.href = "../index.html";
                } else {
                    alert(data.error || data.message);
                }
            });
        });
    }

    const register = document.getElementById("signup");
    if(register != null) {
        register.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const username = document.getElementById("username").value;

            if(email == "" || password == "" || username == "") {
                alert("Please fill in all fields");
                return;
            }

            fetch("http://localhost:3000/signup", {method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({email, username, password})}).then(res => res.json())
            .then(data => {
                if(data.success) {
                    alert("Account created successfully");
                    window.location.href = "login.html";
                } else {
                    alert(data.error || data.message);
                }
            });
        });
    }
});