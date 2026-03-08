
let cart=[]

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

document.getElementById("cart-total").innerText="Total: R"+total
localStorage.setItem("cartTotal", total)

}

function toggleCart(){
document.getElementById("cart").classList.toggle("open")
}

function goCheckout(){
let total = localStorage.getItem("cartTotal") || 0
window.location.href="checkout.html?total="+total
}

/* PRODUCT RENDER SYSTEM */

function renderProducts(containerId, limit=null){

if(typeof products === "undefined") return

const container=document.getElementById(containerId)
if(!container) return

container.innerHTML=""

let list = products
if(limit) list = products.slice(0,limit)

list.forEach(p=>{

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
renderProducts("shop-products")
renderProducts("home-products",3)
}
