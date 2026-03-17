<script>
  const products [
window.onload = function(){

  const params = new URLSearchParams(window.location.search);
  const rawId = params.get("id");

  const container = document.getElementById("product-page");

  if(typeof products === "undefined"){
    container.innerHTML = "<p style='text-align:center'>Error loading products</p>";
    return;
  }

  // ✅ FIX: MATCH USING ID (NOT NAME)
  let product = null;

  for(let i = 0; i < products.length; i++){
    if(products[i].id === rawId){
      product = products[i];
      break;
    }
  }

  if(!product){
    container.innerHTML = "<p style='text-align:center'>Product not found</p>";
    console.log("Looking for ID:", rawId);
    console.log("Available:", products.map(p => p.id));
    return;
  }

  container.innerHTML = `
    <div style="max-width:1000px;margin:auto">

      <a href="./shop.html" style="display:block;margin-bottom:20px;">← Back to Shop</a>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px">

        <div>
          <img id="main-image" src="${product.image}" style="width:100%">
          <div id="thumbs" style="display:flex;gap:10px;margin-top:10px"></div>
        </div>

        <div>
          <h1>${product.name}</h1>
          <p>R${product.price}</p>
          <p>${product.description}</p>

          <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  `;

  // ✅ IMAGE GALLERY
  const main = document.getElementById("main-image");
  const thumbs = document.getElementById("thumbs");

  let images = [];

  if(product.image) images.push(product.image);

  if(product.images){
    for(let i=0;i<product.images.length;i++){
      images.push(product.images[i]);
    }
  }

  for(let i=0;i<images.length;i++){
    const img = document.createElement("img");
    img.src = images[i];
    img.style.width = "60px";
    img.style.cursor = "pointer";

    img.onclick = function(){
      main.src = images[i];
    };

    thumbs.appendChild(img);
  }

}];
</script>
