const API = "https://shop-nxsb.onrender.com";

(function () {
    const path = window.location.pathname;
    const token = localStorage.getItem("token");
    const isShopPage = path.includes("shop.html") || path.includes("index.html") || path.endsWith("/") || path.endsWith("/shop");

    if (isShopPage && !token) {
        window.location.href = "login.html";
    }
})();

function showLoader() {
    const loader = document.getElementById('loader');
    const waitMsg = document.getElementById('wait-msg');
    if (!loader) return;
    loader.style.display = 'flex';
    window.loaderTimer = setTimeout(() => {
        if (waitMsg) waitMsg.style.display = 'block';
    }, 2000);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    const waitMsg = document.getElementById('wait-msg');
    if (loader) loader.style.display = 'none';
    if (waitMsg) waitMsg.style.display = 'none';
    clearTimeout(window.loaderTimer);
}

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

async function handleAuth(type) {
    showLoader();
    try {
        if (type === 'login') {
            await login();
        } else {
            await register();
        }
    } catch (e) {
        console.error(e);
    } finally {
        hideLoader();
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "login.html";
}
document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const btn = document.querySelector(".form-box button");
        if (btn) btn.click();
    }
});