import { isLoggedIn, loginUser } from "../utils/auth.js";
import {
  isValidEmail,
  isNotEmpty,
  isValidPassword,
} from "../utils/validators.js";

// Redirect if already logged in
if (isLoggedIn()) {
  window.location.href = "/";
}

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Reset error messages
  document.getElementById("email-error").textContent = "";
  document.getElementById("password-error").textContent = "";

  let hasError = false;

  // Validate the fields
  if (!isNotEmpty(email)) {
    document.getElementById("email-error").textContent = "Email is required!";
    hasError = true;
  } else if (!isValidEmail(email)) {
    document.getElementById("email-error").textContent =
      "Invalid email format!";
    hasError = true;
  }

  if (!isNotEmpty(password)) {
    document.getElementById("password-error").textContent =
      "Password is required!";
    hasError = true;
  } else if (!isValidPassword(password)) {
    document.getElementById("password-error").textContent =
      "Password must be at least 6 characters!";
    hasError = true;
  }

  if (hasError) return;

  // Call login function
  const user = await loginUser(email, password);

  if (user) {
    window.location.href = "/"; // Redirect to home on success
  } else {
    document.getElementById("email-error").textContent = "Invalid credentials!";
  }
});
