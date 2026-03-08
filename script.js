
let cart = JSON.parse(localStorage.getItem("cartData")) || []

function saveCart(){
localStorage.setItem("cartData",JSON.stringify(cart))
}

function addToCart(name,price,image,isBundle){

let item=cart.find(p=>p.name===name)

if(item){
item.qty++
}else{
cart.push({name,price,image,isBundle,qty:1})
}

saveCart()
updateCart()
}

function updateCart(){

let items=document.getElementById("cart-items")
if(!items) return

items.innerHTML=""
let total=0

cart.forEach((item,i)=>{

let div=document.createElement("div")

div.innerHTML=`
<img src="${item.image}" class="cart-img">
${item.name} x${item.qty}
<button onclick="removeItem(${i})">Remove</button>
`

items.appendChild(div)

let price=item.price

# bundle discount 10%
if(item.isBundle){
price = price * 0.9
}

total+=price*item.qty

})

document.getElementById("cart-total").innerText="Total: R"+Math.round(total)
localStorage.setItem("cartTotal",Math.round(total))
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

let total=localStorage.getItem("cartTotal")||0
let ship=document.getElementById("shipping").value

total=parseInt(total)+parseInt(ship)

window.location.href="checkout.html?total="+total
}

function changeImage(el){
document.getElementById("main-img").src=el.src
}

function submitReview(){

let text=document.getElementById("review-text").value
let reviews=JSON.parse(localStorage.getItem("reviews"))||[]

reviews.push(text)
localStorage.setItem("reviews",JSON.stringify(reviews))

loadReviews()
}

function loadReviews(){

let reviews=JSON.parse(localStorage.getItem("reviews"))||[]
let list=document.getElementById("review-list")

if(!list) return

list.innerHTML=""

reviews.forEach(r=>{
let div=document.createElement("div")
div.innerText="★★★★★ "+r
list.appendChild(div)
})
}

window.onload=function(){
updateCart()
loadReviews()
}
