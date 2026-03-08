
let cart = JSON.parse(localStorage.getItem("cartData")) || [];

function saveCart() {
  localStorage.setItem("cartData", JSON.stringify(cart));
}

function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  saveCart();
  updateCart();
  openCart();
}

function updateCart() {
  const items = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!items || !totalEl) return;

  items.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-row";
    div.innerHTML = `
      <img src="${item.image}" class="cart-img" alt="${item.name}">
      <div class="cart-row-info">
        <strong>${item.name}</strong>
        <p>R${item.price} x ${item.qty}</p>
        <button type="button" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    items.appendChild(div);
    total += item.price * item.qty;
  });

  totalEl.innerText = "Total: R" + total;
  localStorage.setItem("cartTotal", total);
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function openCart() {
  const c = document.getElementById("cart");
  if (c) c.classList.add("open");
}

function closeCart() {
  const c = document.getElementById("cart");
  if (c) c.classList.remove("open");
}

function toggleCart() {
  const c = document.getElementById("cart");
  if (c) c.classList.toggle("open");
}

function goCheckout() {
  const total = localStorage.getItem("cartTotal") || 0;
  window.location.href = "checkout.html?total=" + total;
}

function renderProducts(containerId, limit = null) {
  if (typeof products === "undefined") return;
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  let list = products;
  if (limit) list = products.slice(0, limit);

  list.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">R${Number(p.price).toFixed(0)}</p>
      <button type="button">Add to Cart</button>
    `;
    const btn = div.querySelector("button");
    btn.onclick = function () {
      addToCart(p.name, Number(p.price), p.image);
    };
    container.appendChild(div);
  });
}

window.onload = function () {
  updateCart();
  renderProducts("home-products", 3);
  renderProducts("shop-products");
};
