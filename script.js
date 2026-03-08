
let cart = JSON.parse(localStorage.getItem("cartData")) || []

function saveCart(){
localStorage.setItem("cartData", JSON.stringify(cart))
}

function addToCart(name,price){

let existing = cart.find(p => p.name === name)

if(existing){
existing.qty++
}else{
cart.push({name,price,qty:1})
}

saveCart()
updateCart()
toggleCart()

let fb=document.getElementById("cart-feedback")
fb.classList.add("show")
setTimeout(()=>fb.classList.remove("show"),1500)

}

function updateCart(){

let items=document.getElementById("cart-items")
let total=0

if(!items) return

items.innerHTML=""

cart.forEach((item,index)=>{

let div=document.createElement("div")

div.innerHTML=`
<strong>${item.name}</strong><br>
R${item.price} x ${item.qty}<br>
<button onclick="changeQty(${index},1)">+</button>
<button onclick="changeQty(${index},-1)">-</button>
<button onclick="removeItem(${index})">Remove</button>
`

items.appendChild(div)

total+=item.price*item.qty

})

document.getElementById("cart-total").innerText="Total: R"+total

localStorage.setItem("cartTotal", total)

}

function changeQty(i,delta){

cart[i].qty += delta

if(cart[i].qty <=0){
cart.splice(i,1)
}

saveCart()
updateCart()

}

function removeItem(i){

cart.splice(i,1)

saveCart()
updateCart()

}

function toggleCart(){
document.getElementById("cart").classList.toggle("open")
}

function goCheckout(){

let total = localStorage.getItem("cartTotal") || 0
window.location.href="checkout.html?total="+total

}

window.onload = updateCart
