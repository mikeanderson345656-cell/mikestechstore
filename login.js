// login.js — enhanced login handler (localStorage demo auth)
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    if (!form) {
      console.warn("[login.js] Login form not found.");
      return;
    }

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const messageBox = document.createElement("div");
    messageBox.className = "form-message";
    form.prepend(messageBox);

    // Helper: safe JSON parse
    const safeParse = (key, fallback) => {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    };

    const showMessage = (msg, type = "error") => {
      messageBox.textContent = msg;
      messageBox.className = `form-message ${type}`;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = (emailInput?.value || "").trim().toLowerCase();
      const password = (passwordInput?.value || "").trim();

      if (!email || !password) {
        showMessage("⚠️ Please enter both email and password.");
        return;
      }

      const users = safeParse("users", []);
      const user = users.find(
        (u) => u.email?.toLowerCase() === email && u.password === password
      );

      if (!user) {
        showMessage("❌ Invalid email or password.");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(user));
      showMessage("✅ Welcome back! Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "shop.html";
      }, 1200);
    });
  });
})();
