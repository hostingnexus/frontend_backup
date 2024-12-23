document.addEventListener("DOMContentLoaded", () => {
    const plan = JSON.parse(localStorage.getItem("purchasing"));
    if(plan == null) {
        window.location.href = "index.html";
        return;
    }

    // verify token here, its a MUST to avoid issues
    fetch("http://localhost:3000/verify", {method: "POST", headers: {
        "Content-Type": "application/json"
    }, body: JSON.stringify({token: localStorage.getItem("token")})}).then(res => res.json())
    .then(data => {
        if(data.success) {
            // Ignore
        } else {
            window.location.href = "auth/login.html";
            localStorage.removeItem("token");
            return;
        }
    });

    const parsedPrice = parseFloat(plan.price).toFixed(2);
    document.getElementById("game").innerText = `You are purchasing ${plan.game} package`;
    document.getElementById("plan").innerText = `The plan you're purchasing: ${plan.name}`;
    document.getElementById("price").innerText = `Price: ${parsedPrice}€`;

    const purchase = document.getElementById("purchase");
    purchase.addEventListener("click", () => {
        fetch("http://localhost:3000/purchase", {method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({token: localStorage.getItem("token"), plan_id: plan.id})}).then(res => res.json())
        .then(data => {
            if(data.success) {
                window.location.href = data.url;
            } else {
                alert(data.error || data.message);
            }
        });
    });
});