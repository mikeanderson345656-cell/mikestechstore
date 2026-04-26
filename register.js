// register.js — modern registration with localStorage demo auth
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");

    if (!form) {
      console.warn("[register.js] Register form not found.");
      return;
    }

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput =
      document.getElementById("confirmPassword") ||
      form.querySelector('input[name="confirmPassword"]');

    const safeParse = (key, fallback) => {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = (nameInput?.value || "").trim();
      const email = (emailInput?.value || "").trim().toLowerCase();
      const password = (passwordInput?.value || "").trim();
      const confirmPassword = (confirmPasswordInput?.value || "").trim();

      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      const users = safeParse("users", []);
      const exists = users.some((u) => u.email?.toLowerCase() === email);

      if (exists) {
        alert("A user with this email already exists. Try logging in.");
        window.location.href = "login.html";
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful! Please log in.");
      window.location.href = "login.html";
    });
  });
})();
