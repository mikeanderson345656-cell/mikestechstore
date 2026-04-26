function addToCart(name, price, quantity = 1) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Ensure price is saved as a number
  price = Number(price);
  quantity = Number(quantity);

  let existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  alert(`${quantity} x ${name} added to cart!`);
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // Background color picker
  const bgColorInput = document.getElementById("bg-color");
  if (bgColorInput) {
    // Load saved color if any
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) {
      document.body.style.backgroundColor = savedColor;
      bgColorInput.value = savedColor;
    }

    // Change theme on input
    bgColorInput.addEventListener("input", (e) => {
      const color = e.target.value;
      document.body.style.backgroundColor = color;
      localStorage.setItem("bgColor", color);
    });
  }
});
