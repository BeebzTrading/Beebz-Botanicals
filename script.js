
let cart=[]

function addToCart(name,price){
cart.push({name,price})
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

}

function toggleCart(){
document.getElementById("cart").classList.toggle("open")
}
