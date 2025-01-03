document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if(!urlParams.has("id")) {
        // we have no id
        window.location.href = "index.html";
        return;
    }

    const id = urlParams.get("id");
    fetch("https://api.hostnexus.cloud/plans?id=" + id)
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i < data.length; i++) {
            const parsedPrice = parseFloat(data[i].price).toFixed(2);

            const game = document.createElement("div");
            game.classList.add("plan");


            const h2 = document.createElement("h2");
            h2.innerText = data[i].name;

            const cores = document.createElement("p");
            cores.innerText = "Cores: " + data[i].cores;

            const storage = document.createElement("p");
            storage.innerText = "Storage: " + data[i].storage + "GB";

            const price = document.createElement("p");
            price.innerText = parsedPrice + "€";

            const order = document.createElement("button");
            order.innerText = "Order";


            game.appendChild(h2);
            game.appendChild(cores);
            game.appendChild(storage);
            game.appendChild(price);
            game.appendChild(order);

            order.addEventListener("click", () => {
                if(localStorage.getItem("token") != null) {
                    localStorage.setItem("purchasing", JSON.stringify(data[i]));
                    window.location.href = "purchase.html";
                } else {
                    window.location.href = "auth/login.html";
                }
            });

            document.getElementsByClassName("plans")[0].appendChild(game);
        }
    })
});