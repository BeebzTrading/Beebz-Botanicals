let cart=[]

function addToCart(name,price){

cart.push({name,price}) alert(name + ” added to cart”)

}

function viewCart(){

let total=0 let items=“”

cart.forEach(item=>{ items += item.name + ” - R” + item.price + “” total
+= item.price })

alert(“Cart:”+items+“: R”+total)

}
