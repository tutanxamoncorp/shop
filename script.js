<<<<<<< HEAD
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
=======
const path = window.location.pathname;
const token = localStorage.getItem("token");

if (path.includes("index.html") || path.endsWith("/") || path.endsWith("/shop")) {
    if (!token) {
        window.location.href = "login.html";
    } else {
        const username = localStorage.getItem("username");
        document.getElementById("welcome").textContent = `Привет, ${username}! 👋`;
    }
}

const API = "https://shop-n3qe.onrender.com"; // сюда Railway ссылку

async function register() {
    const username = document.getElementById("username").value;
>>>>>>> e401268 (first commit)
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
<<<<<<< HEAD
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        window.location.href = "shop.html";
=======
        alert("Аккаунт создан! Теперь войди.");
        window.location.href = "login.html";
>>>>>>> e401268 (first commit)
    } else {
        const data = await res.json();
        alert("Ошибка: " + JSON.stringify(data));
    }
}
<<<<<<< HEAD
async function login() {
    const username = document.getElementById("username").value.trim();
=======

async function login() {
    const username = document.getElementById("username").value;
>>>>>>> e401268 (first commit)
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
<<<<<<< HEAD
        window.location.href = "shop.html";
=======
        window.location.href = "index.html";
>>>>>>> e401268 (first commit)
    } else {
        alert("Неверный логин или пароль!");
    }
}

<<<<<<< HEAD

=======
>>>>>>> e401268 (first commit)
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "login.html";
<<<<<<< HEAD
=======
}

if (window.location.pathname.includes("index.html")) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token) {
        window.location.href = "login.html";
    } else {
        document.getElementById("welcome").textContent = `Привет, ${username}! 👋`;
    }
>>>>>>> e401268 (first commit)
}