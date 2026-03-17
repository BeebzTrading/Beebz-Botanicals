const cart = JSON.parse(localStorage.getItem("cartData")) || []

function saveCart(){
  localStorage.setItem("cartData", JSON.stringify(cart))
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <p>${item.name} - R${item.price}</p>
      </div>
    `;
  });

  cartTotal.innerText = "Total: R" + total;
}

  cartTotal.innerText = "Total: R" + total
}

function increaseQty(index){
  cart[index].qty++
  saveCart()
  renderCart()
}

function decreaseQty(index){
  if(cart[index].qty > 1){
    cart[index].qty--
  } else {
    cart.splice(index, 1)
  }

  saveCart()
  renderCart()
}

function removeFromCart(index){
  cart.splice(index, 1)
  saveCart()
  renderCart()
}

function addToCart(name, price, image){
  const existing = cart.find(item => item.name === name)

  if(existing){
    existing.qty++
  } else {
    cart.push({ name, price, image, qty: 1 })
  }

  saveCart()
  renderCart()

  const cartPanel = document.getElementById("cart")
  if(cartPanel){
    cartPanel.classList.add("open")
  }

  const overlay = document.getElementById("cart-overlay")
  if(overlay){
    overlay.classList.add("active")
  }
}

function renderProducts(containerId){
  const container = document.getElementById(containerId)

  if(!container || typeof products === "undefined"){
    console.log("Products not loaded or container missing")
    return
  }

  container.innerHTML = ""

  let list = products

  if(containerId === "home-products"){
    list = products.slice(0, 3)
  }

  for(let i = 0; i < list.length; i++){

    const p = list[i]

    const div = document.createElement("div")
    div.classList.add("product")

    // ✅ FIXED LINK
    div.innerHTML = `
      <a href="./product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
      </a>
      <p class="price">R${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')">
        Add to Cart
      </button>
    `

    container.appendChild(div)
  }
}

function renderFiltered(list){
  const container = document.getElementById("shop-products")
  if(!container) return

  container.innerHTML = ""

  list.forEach(p => {
    const div = document.createElement("div")
    div.classList.add("product")

    div.innerHTML = `
      <a href="./product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
      </a>
      <p class="price">R${p.price}</p>
      <button onclick="addToCart('${p.name.replace(/'/g, "\\'")}', ${p.price}, '${p.image}')">
        Add to Cart
      </button>
    `

    container.appendChild(div)
  })
}

function filterProducts(category){
  const filtered = category === "all"
    ? products
    : products.filter(p => p.category === category)

  renderFiltered(filtered)
}

function searchProducts(){
  const input = document.getElementById("searchInput")
  if(!input) return

  const query = input.value.toLowerCase()

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query)
  )

  renderFiltered(filtered)
}

function toggleCart(){
  const cartPanel = document.getElementById("cart")
  const overlay = document.getElementById("cart-overlay")

  if(!cartPanel) return

  cartPanel.classList.toggle("open")

  if(overlay){
    overlay.classList.toggle("active")
  }
}

function closeCart(){
  const cartPanel = document.getElementById("cart")
  const overlay = document.getElementById("cart-overlay")

  if(!cartPanel) return

  cartPanel.classList.remove("open")

  if(overlay){
    overlay.classList.remove("active")
  }
}

function goCheckout(){
  window.location.href = "./checkout.html"
}

window.onload = function(){

  if(typeof products === "undefined"){
    console.error("Products not loaded")
    return
  }

  const shopContainer = document.getElementById("shop-products")

  if(shopContainer){
    renderProducts("shop-products")
  }

  renderCart()
}

// SAFE FADE FIX (won’t break your site)
if ('IntersectionObserver' in window) {
  const faders = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      }
    });
  });

  faders.forEach(el => observer.observe(el));
}

let currentQty = 1;

function changeQty(amount){
  currentQty += amount;
  if(currentQty < 1) currentQty = 1;
  document.getElementById("qty").innerText = currentQty;
}

function addMultipleToCart(name, price, image){
  for(let i = 0; i < currentQty; i++){
    addToCart(name, price, image);
  }
}
