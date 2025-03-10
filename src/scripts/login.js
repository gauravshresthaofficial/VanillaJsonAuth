import { isLoggedIn, loginUser } from "./utils/auth.js";
import { redirectTo } from "./utils/helper.js";
import {
  isValidEmail,
  isNotEmpty,
  isValidPassword,
} from "./utils/validators.js";

// Redirect if already logged in
if (isLoggedIn()) {
  redirectTo("/");
}

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Reset error messages
  document.getElementById("email-error").textContent = "";
  document.getElementById("password-error").textContent = "";

  // Validate fields
  const hasError = validateForm(email, password);
  if (hasError) return;

  // Attempt login
  const user = await loginUser(email, password);

  if (user) {
    redirectTo("/");
  } else {
    document.getElementById("email-error").textContent = "Invalid credentials!";
  }
});

// Validate form fields
const validateForm = (email, password) => {
  let hasError = false;

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

  return hasError;
};
