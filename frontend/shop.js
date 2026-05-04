
const products = [
    { id:1,  brand:"Nike",        name:'Air Force 1 "Triple White"',     emoji:"👟", price:4200,  badge:"new",  category:"nike" },
    { id:2,  brand:"Jordan",      name:"Air Jordan 1 Retro High OG",     emoji:"🏀", price:8500,  badge:null,   category:"jordan" },
    { id:3,  brand:"Adidas",      name:'Samba OG "Core Black"',          emoji:"⚽", price:5100,  badge:"new",  category:"adidas" },
    { id:4,  brand:"New Balance", name:"990v6 Made in USA",              emoji:"🇺🇸", price:9800,  badge:null,   category:"new_balance" },
    { id:5,  brand:"Nike",        name:'Dunk Low "Panda"',               emoji:"🐼", price:5600,  badge:"sale", category:"nike",        oldPrice:7200 },
    { id:6,  brand:"Adidas",      name:'Gazelle "Bold Blue"',            emoji:"💙", price:4400,  badge:null,   category:"adidas" },
    { id:7,  brand:"Jordan",      name:'Jordan 4 Retro "Military Blue"', emoji:"🎖️", price:12000, badge:"new",  category:"jordan" },
    { id:8,  brand:"New Balance", name:'2002R "Protection Pack"',        emoji:"🌫️", price:6300,  badge:null,   category:"new_balance" },
    { id:9,  brand:"Nike",        name:'Cortez "Forrest Gump"',          emoji:"🌿", price:3800,  badge:"sale", category:"nike",        oldPrice:5000 },
    { id:10, brand:"Adidas",      name:'Stan Smith "Lux"',               emoji:"🌿", price:6800,  badge:null,   category:"adidas" },
    { id:11, brand:"Jordan",      name:'Air Jordan 11 "Cherry"',         emoji:"🍒", price:13500, badge:"new",  category:"jordan" },
    { id:12, brand:"New Balance", name:'574 "Sea Salt"',                 emoji:"🌊", price:4100,  badge:null,   category:"new_balance" },
];

let filtered = [...products];
let cart = [];
let activeCategory = "all";

document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    const userNameEl = document.getElementById("user-name");
    if (userNameEl && username) userNameEl.textContent = "Привет, " + username;

    const cartBtn = document.getElementById("cart-btn");
    if (cartBtn) {
        cartBtn.addEventListener("click", function () {
            renderCartItems();
            document.getElementById("cart-overlay").classList.add("open");
        });
    }

    renderCatalog(products);
});


function renderCatalog(list) {
    const grid = document.getElementById("catalog");
    const countLabel = document.getElementById("count-label");
    if (!grid) return;
    if (countLabel) countLabel.textContent = list.length + " товаров";

    grid.innerHTML = list.map(function (p) {
        const badge = p.badge
            ? '<div class="product-badge ' + p.badge + '">' + (p.badge === "new" ? "NEW" : "SALE") + "</div>"
            : "";
        const oldPrice = p.oldPrice
            ? '<span class="product-price-old">$' + p.oldPrice.toLocaleString() + "</span>"
            : "";
            

        const inCart = cart.find(function (x) { return x.id === p.id; });
        const btnClass = inCart ? "add-btn added" : "add-btn";
        const btnText = inCart ? "✓" : "+";

        return (
            '<div class="product-card">' +
                '<div class="product-img">' +
                    badge +
                    "<span>" + p.emoji + "</span>" +
                "</div>" +
                '<div class="product-info">' +
                    '<div class="product-brand">' + p.brand + "</div>" +
                    '<div class="product-name">' + p.name + "</div>" +
                    '<div class="product-footer">' +
                        "<div>" +
                            '<span class="product-price">$' + p.price.toLocaleString() + "</span>" +
                            oldPrice +
                        "</div>" +
                      
                        '<button class="' + btnClass + '" id="btn-' + p.id + '" onclick="addToCart(' + p.id + ')">' + btnText + '</button>' +
                    "</div>" +
                "</div>" +
            "</div>"
        );
    }).join("");
}
function filterProducts(cat, btn) {
    document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    activeCategory = cat;
    filtered = cat === "all" ? [...products] : products.filter(function (p) { return p.category === cat; });
    renderCatalog(filtered);
}

function sortProducts(val) {
    if (val === "price_asc") filtered.sort(function (a, b) { return a.price - b.price; });
    else if (val === "price_desc") filtered.sort(function (a, b) { return b.price - a.price; });
    else if (val === "name") filtered.sort(function (a, b) { return a.name.localeCompare(b.name); });
    else filtered = activeCategory === "all" ? [...products] : products.filter(function (p) { return p.category === activeCategory; });
    renderCatalog(filtered);
}


function addToCart(id) {
    const p = products.find(function (x) { return x.id === id; });
    const existing = cart.find(function (x) { return x.id === id; });
    if (existing) { existing.qty++; } else { cart.push(Object.assign({}, p, { qty: 1 })); }
    updateCartCount();
    showToast(p.name + " добавлен в корзину");
    const btn = document.getElementById("btn-" + id);
    if (btn) { btn.classList.add("added"); btn.textContent = "✓"; }
}

function removeFromCart(id) {

    cart = cart.filter(function (x) { return x.id !== id; });
    updateCartCount();
    renderCartItems();

   
    const btn = document.getElementById("btn-" + id);
    if (btn) { 
        btn.classList.remove("added"); 
        btn.textContent = "+"; 
    }
}
function updateCartCount() {
    const total = cart.reduce(function (s, x) { return s + x.qty; }, 0);
    const el = document.getElementById("cart-count");
    if (!el) return;
    el.style.display = total > 0 ? "flex" : "none";
    el.textContent = total;
}

function renderCartItems() {
    const container = document.getElementById("cart-items");
    const footer = document.getElementById("cart-footer");
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div>Корзина пуста</div>';
        if (footer) footer.style.display = "none";
        return;
    }

    container.innerHTML = cart.map(function (item) {
        return (
            '<div class="cart-item">' +
                '<div class="cart-item-img">' + item.emoji + "</div>" +
                '<div class="cart-item-info">' +
                    '<div class="cart-item-name">' + item.name + "</div>" +
                    '<div class="cart-item-price">' + item.qty + " × $" + item.price.toLocaleString() + "</div>" +
                "</div>" +
                '<button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')">✕</button>' +
            "</div>"
        );
    }).join("");

    const sum = cart.reduce(function (s, x) { return s + x.price * x.qty; }, 0);
    const totalEl = document.getElementById("cart-total");
    if (totalEl) totalEl.textContent = "$" + sum.toLocaleString();
    if (footer) footer.style.display = "block";
}

function closeCart() {
    const overlay = document.getElementById("cart-overlay");
    if (overlay) overlay.classList.remove("open");
}

function handleOverlayClick(e) {
    if (e.target === document.getElementById("cart-overlay")) closeCart();
}

function checkout() {
    showToast("Оформление заказа — скоро! 🚀");
    closeCart();
}


let toastTimer;
function showToast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2500);
}