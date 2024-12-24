// //             <div class="game">
//                 <img src="images/discord.jpg" alt="Terraria">
//                 <h2>Discord</h2>
//             </div>

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("token") != null) {
        fetch("https://api.hostnexus.cloud/verify", {method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({token: localStorage.getItem("token")})}).then(res => res.json())
        .then(data => {
            if(data.success) {
                // Ignore
            } else {
                localStorage.removeItem("token");
                window.location.reload();
                return;
            }
        });
    }


    fetch("https://api.hostnexus.cloud/games")
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i < data.length; i++) {
            const game = document.createElement("div");
            game.classList.add("game");

            const img = document.createElement("img");
            img.src = data[i].image;
            img.alt = data[i].name;

            const h2 = document.createElement("h2");
            h2.innerText = data[i].name;

            game.appendChild(img);
            game.appendChild(h2);

            game.addEventListener("click", () => {
                window.location.href = `plans.html?id=${data[i].name}`;
            });

            document.getElementsByClassName("games")[0].appendChild(game);
        }
    });
});