const productId = new URLSearchParams(window.location.search).get("id");

const fetchProductDetails = (id) => {
  fetch(`http://localhost:8000/api/products/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Product not found");
      }
      return response.json();
    })
    .then((product) => {
      const productDetailDiv = document.getElementById("product-detail");
      productDetailDiv.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}" style="width:100%; border-radius: 8px;"/>
        <h2>${product.name}</h2>
        <p><strong>Price:</strong> $${product.price}</p>
      `;
    })
    .catch((error) => {
      document.getElementById(
        "product-detail"
      ).innerHTML = `<p>Error: ${error.message}</p>`;
    });
};

const updateCartCount = () => {
  fetch(`http://localhost:8000/api/cart/count`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("cart-count").textContent = data.count;
    });
};

const goBack = () => {
  window.history.back();
};

fetchProductDetails(productId);
updateCartCount();
