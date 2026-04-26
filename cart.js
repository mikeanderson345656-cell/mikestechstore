document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

// Renders the cart on page load
function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsContainer = document.getElementById("cart-items");
  let cartTotal = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: $0.00";
    updateCartCount();
    return;
  }

  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <p>${item.name} - $${item.price} × ${item.quantity}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItemsContainer.appendChild(div);
    total += Number(item.price) * Number(item.quantity);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  updateCartCount();
}

// Updates the cart count in navbar
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

// Removes an item by index
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
