{/* <div class="server">
<h2>Minecraft</h2>
<h3>Memory: 2GB</h3>
<h3>CPU: 200%</h3>
<h3>Status: Starting</h3>
<div class="actions">
    <button id="view">View</button>
    <button id="changeegg">Change egg</button>
    <button id="reinstall">Reinstall</button>
</div>
</div> */}

document.addEventListener("DOMContentLoaded", () => {

    function createServer(server) {
        const div = document.createElement("div");
        div.classList.add("server");

        const game = document.createElement("h2");
        game.innerText = server.game;
        div.appendChild(game);

        const memory = document.createElement("h3");
        memory.innerText = `Memory: ${server.memory}GB`;
        div.appendChild(memory);

        const cpu = document.createElement("h3");
        cpu.innerText = `CPU: ${server.cpu}`;
        div.appendChild(cpu);

        const status = document.createElement("h3");
        status.innerText = `Status: ${server.state}`;
        div.appendChild(status);

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const view = document.createElement("button");
        view.innerText = "View";
        view.addEventListener("click", () => {
            window.location.href = `https://panel.byenoob.com/server/${server.string_id}`;
        });
        actions.appendChild(view);

        const changeegg = document.createElement("button");
        changeegg.innerText = "Change egg";
        changeegg.id = "changeegg";
        changeegg.addEventListener("click", () => {
            const modal = document.getElementById("eggmodal");
            modal.style.display = "block";

            // server.possible
            const select = document.getElementById("eggs");
            select.innerHTML = "";
            for(let i = 0; i < server.possible.length; i++) {
                const option = document.createElement("option");
                option.egg = server.possible[i].egg;
                option.nest = server.possible[i].nest;
                option.innerText = server.possible[i].name;
                select.appendChild(option);
            }

            document.getElementById("submit").removeEventListener("click", null);
            document.getElementById("submit").addEventListener("click", () => {
                const egg = select.options[select.selectedIndex].egg;
                const nest = select.options[select.selectedIndex].nest;
                
                fetch(`http://localhost:3000/changeegg`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: localStorage.getItem("token")
                    },
                    body: JSON.stringify({server_id: server.id, string_id: server.string_id, egg: egg, nest: nest})
                }).then(data => data.json()).then(response => {
                    if(response.success) {
                        alert("Egg change queued");
                    } else {
                        alert("Error!");
                    }
                });
            });
        });
        actions.appendChild(changeegg);

        const reinstall = document.createElement("button");
        reinstall.innerText = "Reinstall";
        reinstall.addEventListener("click", () => {
            fetch(`http://localhost:3000/reinstall`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                },
                body: JSON.stringify({server_id: server.string_id})
            }).then(data => data.json()).then(response => {
                if(response.success) {
                    alert("Reinstall queued");
                } else {
                    alert("Error!");
                }
            })
        });
        actions.appendChild(reinstall);

        div.appendChild(actions);
    
        document.getElementsByClassName("servers")[0].appendChild(div);
    }

    if(localStorage.getItem("token") != null) {
        // verify token here, its a MUST to avoid issues
        fetch("https://api.hostnexus.cloud/verify", {method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({token: localStorage.getItem("token")})}).then(res => res.json())
        .then(data => {
            if(data.success) {
                // Ignore
            } else {
                window.location.href = "index.html";
                localStorage.removeItem("token");
                return;
            }
        });


        fetch("https://api.hostnexus.cloud/servers", 
            {method: "GET", headers: {
                authorization: localStorage.getItem("token")
            }}
        ).then(res => res.json())
        .then(data => {
            for(let i = 0; i < data.length; i++) {
                const server = data[i];
                
                createServer(server);
            }
        })
    }

    // Detect if they click away from modal
    window.onclick = function(event) {
        if(document.getElementById("eggmodal").style.display === "block" && event.target.id != "changeegg") {
            // Detect if they clicked away from modal 
            if(!document.getElementById("eggmodal").contains(event.target)) {
                document.getElementById("eggmodal").style.display = "none";
            }
        }
    }
});