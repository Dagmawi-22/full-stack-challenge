function confirmOrder() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: cart, total, user: { name, address } }),
  }).then(() => {
    alert("Order confirmed!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
}

document.getElementById("total").textContent = `Total: $${total}`;
