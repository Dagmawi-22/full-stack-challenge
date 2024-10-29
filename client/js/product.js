document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category-select");
  const productsDiv = document.getElementById("products");

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
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
          `;
          productsDiv.appendChild(productElement);
        });
      });
  };

  fetchProducts();

  categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    fetchProducts(selectedCategory);
  });
});
