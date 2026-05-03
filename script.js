const API = "https://shop-n3qe.onrender.com";


(function () {
    const path = window.location.pathname;
    const token = localStorage.getItem("token");

    const isShopPage =
        path.includes("shop.html") ||
        path.includes("index.html") ||
        path.endsWith("/") ||
        path.endsWith("/shop");

    if (isShopPage && !token) {
        window.location.href = "login.html";
    }
})();

/* ── REGISTER ── */
async function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Заполни все поля!");
        return;
    }

    const res = await fetch(`${API}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        window.location.href = "shop.html";
    } else {
        const data = await res.json();
        alert("Ошибка: " + JSON.stringify(data));
    }
}
async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        window.location.href = "shop.html";
    } else {
        alert("Неверный логин или пароль!");
    }
}


function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "login.html";
}