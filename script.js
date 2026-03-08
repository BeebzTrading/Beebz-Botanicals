
let cart = JSON.parse(localStorage.getItem("cartData")) || [];

function saveCart(){
localStorage.setItem("cartData",JSON.stringify(cart));
}

function addToCart(name,price,image){

let item=cart.find(p=>p.name===name);

if(item){
item.qty++;
}else{
cart.push({name,price,image,qty:1});
}

saveCart();
updateCart();
openCart();
}

function updateCart(){

let items=document.getElementById("cart-items");
let totalEl=document.getElementById("cart-total");

if(!items || !totalEl) return;

items.innerHTML="";
let total=0;

cart.forEach((item,i)=>{

let div=document.createElement("div");

div.innerHTML=`
<img src="${item.image}" class="cart-img">
${item.name} x${item.qty}
<button onclick="removeItem(${i})">Remove</button>
`;

items.appendChild(div);

total+=item.price*item.qty;

});

totalEl.innerText="Total: R"+total;
localStorage.setItem("cartTotal",total);
}

function removeItem(i){
cart.splice(i,1);
saveCart();
updateCart();
}







function goCheckout(){

let total=localStorage.getItem("cartTotal")||0;
window.location.href="checkout.html?total="+total;

}

window.onload=function(){
updateCart();
};


function openCart(){
const cart=document.getElementById("cart");
if(cart) cart.classList.add("open");
}

function closeCart(){
const cart=document.getElementById("cart");
if(cart) cart.classList.remove("open");
}

function toggleCart(){
const cart=document.getElementById("cart");
if(cart) cart.classList.toggle("open");
}
