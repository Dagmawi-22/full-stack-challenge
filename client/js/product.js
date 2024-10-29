const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

fetch(`/api/products/${productId}`)
  .then((response) => response.json())
  .then((product) => {
    const productDiv = document.getElementById("product");
    productDiv.textContent = `${product.name} - $${product.price}`;
  });

function addToCart() {
  // Implement add to cart functionality
}
