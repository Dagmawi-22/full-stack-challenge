function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartDiv = document.getElementById("cart");
  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${item.name} - ${item.quantity} - $${item.price}`;
    cartDiv.appendChild(itemDiv);
  });
}

displayCart();

function checkout() {
  window.location.href = "checkout.html";
}
