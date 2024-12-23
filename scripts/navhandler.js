document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("token") != null) {
        const links = document.getElementsByClassName("links")[0];
        if(links != null) {
            // Remove login/signup buttons because user is logged in
            for(let i = 0; i < links.children.length; i++) {
                if(links.children[i].classList.contains("authbtn")) {
                    links.children[i].style.display = "none";
                }
            }

            // Add dashboard

            if(window.location.href.includes("dashboard.html")) {
                const panel = document.createElement("a");
                panel.href = "https://panel.byenoob.com";
                panel.innerText = "Panel";
                links.appendChild(panel);
                return;
            }

            const dashboard = document.createElement("a");
            dashboard.href = "dashboard.html";
            dashboard.innerText = "Dashboard";
            links.appendChild(dashboard);
        }
    }
});