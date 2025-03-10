import { isLoggedIn, signupUser } from "./utils/auth.js";
import { redirectTo } from "./utils/helper.js";
import {
  isValidEmail,
  isValidPassword,
  isNotEmpty,
} from "./utils/validators.js";

// Redirect if already logged in
if (isLoggedIn()) {
  redirectTo("/");
}

// Handle signup form submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Reset error messages
  resetErrorMessages();

  // Validate form fields
  const hasError = validateSignupForm(name, email, password);
  if (hasError) return;

  // Attempt signup
  const newUser = await signupUser(name, email, password);

  if (!newUser) {
    document.getElementById("email-error").textContent =
      "Email already in use! Please log in.";
    return;
  }

  // Redirect to login page
  redirectTo("login.html");
});

// Reset error messages
const resetErrorMessages = () => {
  document.getElementById("name-error").textContent = "";
  document.getElementById("email-error").textContent = "";
  document.getElementById("password-error").textContent = "";
};

// Validate signup form fields
const validateSignupForm = (name, email, password) => {
  let hasError = false;

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

  return hasError;
};
