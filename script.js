
let cart = JSON.parse(localStorage.getItem("cartData")) || []

function saveCart(){localStorage.setItem("cartData",JSON.stringify(cart))}

function addToCart(name,price,image){
let item=cart.find(p=>p.name===name)
if(item){item.qty++}
else{cart.push({name,price,image,qty:1})}
saveCart()
updateCart()
openCart()
}

function updateCart(){
let items=document.getElementById("cart-items")
let totalEl=document.getElementById("cart-total")
if(!items||!totalEl)return
items.innerHTML=""
let total=0

cart.forEach((item,i)=>{
let div=document.createElement("div")
div.innerHTML=`
<img src="${item.image}" class="cart-img">
${item.name} x${item.qty}
<button onclick="removeItem(${i})">Remove</button>`
items.appendChild(div)
total+=item.price*item.qty
})
totalEl.innerText="Total: R"+total
localStorage.setItem("cartTotal",total)
}

function removeItem(i){cart.splice(i,1);saveCart();updateCart()}

function openCart(){document.getElementById("cart").classList.add("open")}
function closeCart(){document.getElementById("cart").classList.remove("open")}
function toggleCart(){document.getElementById("cart").classList.toggle("open")}

function goCheckout(){
let total=localStorage.getItem("cartTotal")||0
window.location.href="checkout.html?total="+total
}

function getCategory(name){
name=name.toLowerCase()
if(name.includes("dish")||name.includes("pouch")||name.includes("saver")) return "accessory"
if(name.includes("bundle")||name.includes("set")||name.includes("ritual")) return "bundle"
if(name.includes("salt")||name.includes("bath")||name.includes("tea")||name.includes("steamer")) return "bath"
if(name.includes("soap")) return "soap"
return "accessory"
}

function renderProducts(containerId,limit=null){
if(typeof products==="undefined") return
let container=document.getElementById(containerId)
if(!container) return

container.innerHTML=""
let list=products
if(limit) list=products.slice(0,limit)

list.forEach(p=>{
let div=document.createElement("div")
div.className="product"
div.innerHTML=`
<img src="${p.image}">
<h3>${p.name}</h3>
<p class="price">R${p.price}</p>
<button onclick="addToCart('${p.name}',${p.price},'${p.image}')">Add to Cart</button>`
container.appendChild(div)
})
}

function drawProducts(list){
let container=document.getElementById("shop-products")
if(!container) return
container.innerHTML=""
list.forEach(p=>{
let div=document.createElement("div")
div.className="product"
div.innerHTML=`
<img src="${p.image}">
<h3>${p.name}</h3>
<p class="price">R${p.price}</p>
<button onclick="addToCart('${p.name}',${p.price},'${p.image}')">Add to Cart</button>`
container.appendChild(div)
})
}

function filterCategory(cat){
if(cat==="all"){drawProducts(products);return}
let filtered=products.filter(p=>getCategory(p.name)===cat)
drawProducts(filtered)
}

function filterProducts(){
let input=document.getElementById("searchInput")
if(!input) return
let term=input.value.toLowerCase()
let filtered=products.filter(p=>p.name.toLowerCase().includes(term))
drawProducts(filtered)
}

window.onload=function(){
updateCart()
renderProducts("home-products",3)
renderProducts("shop-products")
}
