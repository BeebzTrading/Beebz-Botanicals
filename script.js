
let cart = []

function addToCart(name,price,image){
cart.push({name,price,image})
updateCart()
}

function updateCart(){

let items=document.getElementById("cart-items")
let total=0

if(!items) return

items.innerHTML=""

cart.forEach(item=>{

let div=document.createElement("div")
div.innerText=item.name+" - R"+item.price
items.appendChild(div)

total+=item.price

})

if(document.getElementById("cart-total")){
document.getElementById("cart-total").innerText="Total: R"+total
}

localStorage.setItem("cartTotal", total)

}

function toggleCart(){
let c=document.getElementById("cart")
if(c) c.classList.toggle("open")
}

function goCheckout(){
let total = localStorage.getItem("cartTotal") || 0
window.location.href="checkout.html?total="+total
}

/* ===== PRODUCT RENDER ===== */

function renderShop(){

if(typeof products === "undefined") return

const container=document.getElementById("shop-products")
if(!container) return

container.innerHTML=""

products.forEach(p=>{

let div=document.createElement("div")
div.className="product"

div.innerHTML=`
<img src="${p.image}">
<h3>${p.name}</h3>
<p class="price">R${p.price}</p>
<button onclick="addToCart('${p.name}',${p.price},'${p.image}')">Add to Cart</button>
`

container.appendChild(div)

})

}

window.onload=function(){
updateCart()
renderShop()
}
