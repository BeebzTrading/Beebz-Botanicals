let cart = JSON.parse(localStorage.getItem("cartData")) || [];

function saveCart() {
  localStorage.setItem("cartData", JSON.stringify(cart));
}

function showFeedback() {
  const fb = document.getElementById("cart-feedback");
  if (!fb) return;
  fb.classList.add("show");
  setTimeout(() => fb.classList.remove("show"), 1200);
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
  showFeedback();
}

function updateCart() {
  const items = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!items || !totalEl) return;

  items.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <img src="${item.image}" class="cart-img" alt="${item.name}">
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <p>R${item.price} x ${item.qty}</p>
        <div class="cart-actions">
          <button type="button" onclick="changeQty(${index}, 1)">+</button>
          <button type="button" onclick="changeQty(${index}, -1)">−</button>
          <button type="button" onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
    items.appendChild(row);

    total += item.price * item.qty;
  });

  totalEl.innerText = "Total: R" + total;
  localStorage.setItem("cartTotal", total);
}

function changeQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function openCart() {
  const cartEl = document.getElementById("cart");
  if (cartEl) cartEl.classList.add("open");
}

function closeCart() {
  const cartEl = document.getElementById("cart");
  if (cartEl) cartEl.classList.remove("open");
}

function toggleCart() {
  const cartEl = document.getElementById("cart");
  if (cartEl) cartEl.classList.toggle("open");
}

function goCheckout() {
  const total = localStorage.getItem("cartTotal") || 0;
  window.location.href = "checkout.html?total=" + total;
}

window.onload = updateCart;
