document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category-select");
  const productsDiv = document.getElementById("products");
  const cartCount = document.getElementById("cart-count");

  const updateCartCount = () => {
    fetch(`${window.API_BASE_URL}/cart/count`)
      .then((response) => response.json())
      .then((data) => {
        cartCount.textContent = data.count;
      });
  };

  fetch(`${window.API_BASE_URL}/categories`)
    .then((response) => response.json())
    .then((categories) => {
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    });

  const fetchProducts = (category = "") => {
    let url = `${window.API_BASE_URL}/products`;
    if (category) {
      url += `?category=${category}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((products) => {
        productsDiv.innerHTML = "";
        products.forEach((product) => {
          const productElement = document.createElement("div");
          productElement.className = "product";
          productElement.innerHTML = `
          <a href="product.html?id=${product._id}" style="text-decoration: none; color: inherit;">
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
          </a>
          <button onclick="addToCart('${product._id}')">Add to Cart</button>
        `;
          productsDiv.appendChild(productElement);
        });
      });
  };

  window.viewDetails = viewDetails;

  const addToCart = (productId) => {
    const quantity = 1;

    fetch(`${window.API_BASE_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Product added to cart!");
        updateCartCount();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  fetchProducts();
  updateCartCount();

  categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    fetchProducts(selectedCategory);
  });

  window.addToCart = addToCart;
});
