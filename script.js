let cart = JSON.parse(localStorage.getItem("cartData")) || []

function saveCart(){
  localStorage.setItem("cartData", JSON.stringify(cart))
}

function addToCart(name, price, image){
  let item = cart.find(p => p.name === name)

  if(item){
    item.qty++
  } else {
    cart.push({ name, price, image, qty: 1 })
  }

  saveCart()
  updateCart()
  openCart()
}

function removeItem(i){
  cart.splice(i, 1)
  saveCart()
  updateCart()
}

function updateCart(){
  let items = document.getElementById("cart-items")
  let totalEl = document.getElementById("cart-total")

  if(!items || !totalEl) return

  items.innerHTML = ""
  let total = 0

  cart.forEach((item, i) => {
    let div = document.createElement("div")
    div.className = "cart-item"

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p class="price">R${item.price}</p>
        <div class="cart-qty">Qty: ${item.qty}</div>
        <button class="remove-btn" onclick="removeItem(${i})">Remove</button>
      </div>
    `

    items.appendChild(div)
    total += item.price * item.qty
  })

  totalEl.innerText = "Total: R" + total
  localStorage.setItem("cartTotal", total)
}

function openCart(){
  const cartEl = document.getElementById("cart")
  if(cartEl) cartEl.classList.add("open")
}

function closeCart(){
  const cartEl = document.getElementById("cart")
  if(cartEl) cartEl.classList.remove("open")
}

function toggleCart(){
  const cartEl = document.getElementById("cart")
  if(cartEl) cartEl.classList.toggle("open")
}

function goCheckout(){
  let total = localStorage.getItem("cartTotal") || 0
  window.location.href = "checkout.html?total=" + total
}

function createProductCard(p){
  let div = document.createElement("div")
  div.className = "product"

 div.innerHTML=`
<a href="./product.html?id=${encodeURIComponent(p.name)}">
  <img src="${p.image}">
  <h3>${p.name}</h3>
</a>

<p class="price">R${p.price}</p>

<button onclick="addToCart('${p.name}',${p.price},'${p.image}')">
Add to Cart
</button>
`
  `

  return div
}

function renderProducts(containerId, limit = null){
  if(typeof products === "undefined") return

  let container = document.getElementById(containerId)
  if(!container) return

  container.innerHTML = ""

  let list = products

  if(containerId === "home-products"){
    const featuredNames = [
      "Rooibos & Honey Bath Salt",
      "Coastal Citrus Bath Salt",
      "Complete Botanical Self-Care Ritual Set"
    ]

    list = products.filter(p => featuredNames.includes(p.name))
  } else if(limit){
    list = products.slice(0, limit)
  }

  list.forEach(p => {
    container.appendChild(createProductCard(p))
  })
}

function filterProducts(category){
  let container = document.getElementById("shop-products")
  if(!container) return

  container.innerHTML = ""

  let filtered = products
  if(category !== "all"){
    filtered = products.filter(p => p.category === category)
  }

  filtered.forEach(p => {
    container.appendChild(createProductCard(p))
  })
}

function searchProducts(){
  let inputEl = document.getElementById("searchInput")
  let container = document.getElementById("shop-products")

  if(!inputEl || !container) return

  let input = inputEl.value.toLowerCase()
  container.innerHTML = ""

  let filtered = products.filter(p => p.name.toLowerCase().includes(input))

  filtered.forEach(p => {
    container.appendChild(createProductCard(p))
  })
}

window.addEventListener("load", function(){
  updateCart()
  renderProducts("home-products")
  renderProducts("shop-products")
})
<script>
function placeOrder(){

  let cart = JSON.parse(localStorage.getItem("cartData")) || []

  if(cart.length === 0){
    alert("Your cart is empty.")
    return
  }

  alert("Thank you for your order! 🌿")

  localStorage.removeItem("cartData")
  localStorage.removeItem("cartTotal")

  window.location.href = "./index.html"
}
</script>
