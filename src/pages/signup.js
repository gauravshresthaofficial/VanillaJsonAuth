import { isLoggedIn, signupUser } from "../utils/auth.js";
import {
  isValidEmail,
  isValidPassword,
  isNotEmpty,
} from "../utils/validators.js";

// Redirect if already logged in
if (isLoggedIn()) {
  window.location.href = "/";
}

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Reset error messages
  document.getElementById("name-error").textContent = "";
  document.getElementById("email-error").textContent = "";
  document.getElementById("password-error").textContent = "";

  let hasError = false;

  // Validate the fields
  if (!isNotEmpty(name)) {
    document.getElementById("name-error").textContent = "Name is required!";
    hasError = true;
  }

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

  // Call signup function
  const newUser = await signupUser(name, email, password);

  if (!newUser) {
    document.getElementById("email-error").textContent =
      "Email already in use! Please log in.";
    return;
  }
  window.location.href = "login.html"; // Redirect to login page
});
