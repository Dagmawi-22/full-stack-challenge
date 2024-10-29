document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category-select");
  const productsDiv = document.getElementById("products");
  const cartCountDiv = document.getElementById("cart-count");
  let cartCount = 0;

  const fetchCategories = () => {
    fetch("http://localhost:8000/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        categories.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.name;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      });
  };

  const fetchProducts = (category = "") => {
    let url = "http://localhost:8000/api/products";
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
              <img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; border-radius: 8px;" />
              <h2>${product.name}</h2>
              <p>$${product.price}</p>
            </a>
            <button onclick="addToCart('${product._id}')">Add to Cart</button>
          `;
          productsDiv.appendChild(productElement);
        });
      });
  };

  const addToCart = (productId) => {
    const quantity = 1;

    fetch("http://localhost:8000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        cartCount += quantity;
        updateCartCount();
        alert("Product added to cart!");
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateCartCount = () => {
    cartCountDiv.textContent = cartCount;
  };

  fetchCategories();
  fetchProducts();
  updateCartCount();

  categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    fetchProducts(selectedCategory);
  });

  window.addToCart = addToCart;
});
