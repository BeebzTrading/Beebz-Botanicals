const cart = JSON.parse(localStorage.getItem("cartData")) || []

function saveCart(){
  localStorage.setItem("cartData", JSON.stringify(cart))
}

function addToCart(name, price, image){
  const existing = cart.find(item => item.name === name)

  if(existing){
    existing.qty++
  } else {
    cart.push({name, price, image, qty:1})
  }

  saveCart()
  alert("Added to cart")
}

function renderProducts(containerId){

  const container = document.getElementById(containerId)
  if(!container) return

  let list = products

  // Home page = show first 3
  if(containerId === "home-products"){
    list = products.slice(0,3)
  }

  container.innerHTML = ""

  list.forEach(p => {

    const div = document.createElement("div")
    div.classList.add("product")

    div.innerHTML = `
      <a href="./product.html?id=${encodeURIComponent(p.name)}">
        <img src="${p.image}">
        <h3>${p.name}</h3>
      </a>

      <p class="price">R${p.price}</p>

      <button onclick="addToCart('${p.name}',${p.price},'${p.image}')">
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
function toggleCart(){
  const cart = document.getElementById("cart")
  if(!cart) return

  cart.classList.toggle("open")
}

function closeCart(){
  const cart = document.getElementById("cart")
  if(!cart) return

  cart.classList.remove("open")
}

  cart.classList.remove("active")
}

function goCheckout(){
  window.location.href = "./checkout.html"
}

function searchProducts(){
  const query = document.getElementById("searchInput").value.toLowerCase()

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query)
  )

  renderFiltered(filtered)
}

function renderFiltered(list){
  const container = document.getElementById("shop-products")
  container.innerHTML = ""

  function renderCart(){

  const cartItems = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")

  if(!cartItems || !cartTotal) return

  cartItems.innerHTML = ""

  let total = 0

  cart.forEach(item => {

    const div = document.createElement("div")

    div.innerHTML = `
      <p>${item.name} x ${item.qty}</p>
      <p>R${item.price * item.qty}</p>
    `

    cartItems.appendChild(div)

    total += item.price * item.qty
  })

  cartTotal.innerText = "Total: R" + total
}

  list.forEach(p => {

    const div = document.createElement("div")
    div.classList.add("product")

    div.innerHTML = `
      <a href="./product.html?id=${encodeURIComponent(p.name)}">
        <img src="${p.image}">
        <h3>${p.name}</h3>
      </a>

      <p class="price">R${p.price}</p>

      <button onclick="addToCart('${p.name}',${p.price},'${p.image}')">
        Add to Cart
      </button>
    `

    container.appendChild(div)
  })
}

// RUN ON PAGE LOAD
renderProducts("home-products")
renderProducts("shop-products")
renderCart()
