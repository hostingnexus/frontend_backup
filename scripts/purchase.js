document.addEventListener("DOMContentLoaded", () => {
    const plan = JSON.parse(localStorage.getItem("purchasing"));
    if(plan == null) {
        window.location.href = "index.html";
        return;
    }

    // verify token here, its a MUST to avoid issues
    fetch("http://srv2.byenoob.com:5080/verify", {method: "POST", headers: {
        "Content-Type": "application/json"
    }, body: JSON.stringify({token: localStorage.getItem("token")})}).then(res => res.json())
    .then(data => {
        if(data.success) {
            // Ignore
        } else {
            window.location.href = "auth/login.html";
            return;
        }
    });

    const parsedPrice = parseFloat(plan.price).toFixed(2);
    document.getElementById("game").innerText = `You are purchasing ${plan.game} package`;
    document.getElementById("plan").innerText = `The plan you're purchasing: ${plan.name}`;
    document.getElementById("price").innerText = `Price: ${parsedPrice}€`;
});