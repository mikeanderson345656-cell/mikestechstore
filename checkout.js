// checkout.js
document.addEventListener("DOMContentLoaded", () => {
  const checkoutSummary = document.querySelector("#checkout-summary");
  const checkoutTotal = document.getElementById("checkout-total");
  const form = document.getElementById("checkout-form");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  // Build order summary dynamically
  checkoutSummary.innerHTML = "";
  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${(item.price * item.quantity).toFixed(2)}</td>
    `;
    checkoutSummary.appendChild(row);
    total += item.price * item.quantity;
  });

  checkoutTotal.textContent = total.toFixed(2);

  // Form submission validation
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect form values
    const shippingName = document.getElementById("shipping-name").value.trim();
    const shippingEmail = document.getElementById("shipping-email").value.trim();
    const shippingAddress = document.getElementById("shipping-address").value.trim();
    const billingName = document.getElementById("billing-name").value.trim();
    const billingAddress = document.getElementById("billing-address").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiry = document.getElementById("expiry-date").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    // Simple required fields check
    if (!shippingName || !shippingEmail || !shippingAddress || !billingName || !billingAddress) {
      alert("❌ Please fill in all shipping and billing fields.");
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingEmail)) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    // Card validation
    if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ""))) {
      alert("❌ Please enter a valid 16-digit card number.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      alert("❌ Expiry date must be in MM/YY format.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      alert("❌ CVV must be 3 or 4 digits.");
      return;
    }

    // ✅ Success
    alert("✅ Order placed successfully! Thank you for shopping with Mike.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
});
