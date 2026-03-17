const cart = JSON.parse(localStorage.getItem("cartData")) || [];

function saveCart(){
  localStorage.setItem("cartData", JSON.stringify(cart));
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * (item.qty || 1);

    cartItems.innerHTML += `
      <div class="cart-item">

        <img src="${item.image}" alt="${item.name}">

        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>R${item.price}</p>

          <div class="cart-controls">
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${item.qty || 1}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>

          <button class="remove-btn" onclick="removeFromCart(${index})">
            Remove
          </button>
        </div>

      </div>
    `;
  });

  cartTotal.innerText = "Total: R" + total;

  // cart count bubble
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    countEl.innerText = totalItems;
  }
}

function removeFromCart(index){
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function addToCart(name, price, image){
  const existing = cart.find(item => item.name === name);

  if(existing){
    existing.qty++;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  saveCart();
  renderCart();

  const cartPanel = document.getElementById("cart");
  if(cartPanel){
    cartPanel.classList.add("open");
  }

  const popup = document.getElementById("cart-popup");

if (popup) {
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 1500);
}
}

function renderProducts(containerId){
  const container = document.getElementById(containerId);
  if(!container || typeof products === "undefined") return;

  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <a href="./product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
      </a>
      <p class="price">R${p.price}</p>
      <button onclick="addToCart('${p.name.replace(/'/g, "\\'")}', ${p.price}, '${p.image}')">
        Add to Cart
      </button>
    `;

    container.appendChild(div);
  });
}

function renderFiltered(list){
  const container = document.getElementById("shop-products");
  if(!container) return;

  container.innerHTML = "";

  list.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <a href="./product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
      </a>
      <p class="price">R${p.price}</p>
      <button onclick="addToCart('${p.name.replace(/'/g, "\\'")}', ${p.price}, '${p.image}')">
        Add to Cart
      </button>
    `;

    container.appendChild(div);
  });
}

function filterProducts(category){
  const filtered = category === "all"
    ? products
    : products.filter(p => p.category === category);

  renderFiltered(filtered);
}

function searchProducts(){
  const input = document.getElementById("searchInput");
  if(!input) return;

  const query = input.value.toLowerCase();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query)
  );

  renderFiltered(filtered);
}

function toggleCart(){
  const cartPanel = document.getElementById("cart");
  if(!cartPanel) return;

  cartPanel.classList.toggle("open");
}

function closeCart(){
  const cartPanel = document.getElementById("cart");
  if(!cartPanel) return;

  cartPanel.classList.remove("open");
}

function goCheckout(){
  window.location.href = "./checkout.html";
}

function changeQty(index, amount){
  const items = document.querySelectorAll(".cart-item");
  const itemEl = items[index];

  if(itemEl){
    itemEl.classList.add("updating");
  }

  setTimeout(() => {
    cart[index].qty += amount;

    if(cart[index].qty < 1){
      cart.splice(index, 1);
    }

    saveCart();
    renderCart();
  }, 150);
}

function handleFadeIn() {
  const elements = document.querySelectorAll(".fade-in");

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
      el.classList.add("show");
    } else {
      el.classList.remove("show"); // 👈 THIS is the fix
    }
  });
}

window.addEventListener("scroll", handleFadeIn);
window.addEventListener("load", handleFadeIn);


window.onload = function(){
  if(typeof products === "undefined") return;

  if(document.getElementById("shop-products")){
    renderProducts("shop-products");
  }

  renderCart();
};
