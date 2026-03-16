const mainImage = document.getElementById("main-product-image")
const thumbnailContainer = document.getElementById("thumbnail-container")

let allImages = []

// Always add main image first
if(product.image){
  allImages.push(product.image)
}

// Then add gallery images safely
if(product.images && Array.isArray(product.images)){
  for(let i = 0; i < product.images.length; i++){
    allImages.push(product.images[i])
  }
}

// Create thumbnails
for(let i = 0; i < allImages.length; i++){

  const img = allImages[i]

  const thumb = document.createElement("img")
  thumb.src = img
  thumb.style.width = "70px"
  thumb.style.height = "70px"
  thumb.style.objectFit = "cover"
  thumb.style.cursor = "pointer"
  thumb.style.borderRadius = "6px"

  thumb.onclick = function(){
    mainImage.src = img
  }

  thumbnailContainer.appendChild(thumb)
}
