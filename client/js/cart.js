const cartItemsDiv = document.getElementById("cart-items");

const fetchCartItems = () => {
  fetch(`http://localhost:8000/api/cart`)
    .then((response) => response.json())
    .then((cartItems) => {
      cartItemsDiv.innerHTML = "";
      cartItems.forEach((item) => {
        cartItemsDiv.innerHTML += `
                    <div class="cart-item">
                        <h2>${item.product.name}</h2>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Price: $${(
                          item.product.price * item.quantity
                        ).toFixed(2)}</p>
                    </div>
                `;
      });
    })
    .catch((error) => {
      console.error("Error fetching cart items:", error);
      cartItemsDiv.innerHTML = "<p>Error fetching cart items.</p>";
    });
};

fetchCartItems();

document.getElementById("checkout-btn").addEventListener("click", () => {
  window.location.href = "checkout.html";
});
