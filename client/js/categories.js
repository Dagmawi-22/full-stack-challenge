fetch("/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    const categoriesDiv = document.getElementById("categories");
    categories.forEach((category) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.textContent = category.name;
      categoriesDiv.appendChild(categoryDiv);
    });
  });
