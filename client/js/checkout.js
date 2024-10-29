const checkoutDetailsDiv = document.getElementById("checkout-details");
let cartItems = [];

const getRandomUserDetails = () => {
  const names = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Michael Brown",
    "Emily Davis",
  ];
  const addresses = [
    "123 Elm St, Springfield, IL",
    "456 Oak Ave, Metropolis, NY",
    "789 Pine Rd, Gotham, NJ",
    "101 Maple Dr, Smallville, KS",
    "202 Birch Blvd, Star City, CA",
  ];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];

  return { name: randomName, address: randomAddress };
};

const displayUserDetails = () => {
  const { name, address } = getRandomUserDetails();
  checkoutDetailsDiv.innerHTML += `<h3>Customer Name: ${name}</h3>`;
  checkoutDetailsDiv.innerHTML += `<p>Delivery Address: ${address}</p>`;
};

const fetchCheckoutDetails = () => {
  fetch(`http://localhost:8000/api/cart`)
    .then((response) => response.json())
    .then((items) => {
      cartItems = items;
      checkoutDetailsDiv.innerHTML = "";
      let total = 0;
      items.forEach((item) => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        checkoutDetailsDiv.innerHTML += `
                    <div class="cart-item">
                        <h5>${item.product.name}</h5>
                        <h6>Quantity: ${item.quantity}</h6>
                        <p>Price: $${item.product.price} each</p>
                        <p>Total: $${itemTotal.toFixed(2)}</p>
                    </div>
                `;
      });
      checkoutDetailsDiv.innerHTML += `<h3>Total Amount: $${total.toFixed(
        2
      )}</h3>`;
      displayUserDetails();
    })
    .catch((error) => {
      console.error("Error fetching cart items:", error);
      checkoutDetailsDiv.innerHTML = "<p>Error fetching checkout details.</p>";
    });
};

fetchCheckoutDetails();

document.getElementById("confirm-order").addEventListener("click", () => {
  const { address, name } = getRandomUserDetails();
  const orderData = {
    deliveryAddress: address,
    name: name,
    items: cartItems.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      total: item.product.price * item.quantity,
    })),
    totalAmount: parseFloat(
      cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      )
    ).toFixed(2),
  };

  fetch(`http://localhost:8000/api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      alert("Order confirmed! Thank you for your purchase!");
      checkoutDetailsDiv.innerHTML = "";
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error confirming order or clearing cart:", error);
      alert("There was a problem confirming your order. Please try again.");
    });
});
