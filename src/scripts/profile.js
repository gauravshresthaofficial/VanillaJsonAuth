// Import necessary functions
import { isLoggedIn } from "./utils/auth";
import { redirectTo, showNotification } from "./utils/helper";
import { isNotEmpty, isValidPassword } from "./utils/validators";
import {
  getAllUsers,
  getUserDetails,
  updateUserDetails,
} from "./utils/userServices";

// Redirect to login if not logged in
if (!isLoggedIn()) {
  redirectTo("login.html");
}

const userId = JSON.parse(localStorage.getItem("user"))?.id;
if (!userId) {
  console.error("User ID not found in localStorage");
  window.location.href = "login.html";
}

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const nameError = document.getElementById("name-error");
const passwordError = document.getElementById("password-error");
const notification = document.getElementById("notification");
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("togglePassword");

let currentUser;
// Initialize user profile
const initializeUserProfile = async () => {
  try {
    currentUser = await getUserDetails(userId);
    if (!currentUser) return;

    nameInput.value = currentUser.name || "";
    emailInput.value = currentUser.email || "";
    passwordInput.value = currentUser.password || "";
  } catch (error) {
    console.error("Error initializing profile:", error);
  }
};

// Populate users sidebar
const populateUsersSidebar = async () => {
  try {
    const users = await getAllUsers();
    users.forEach((person) => {
      if (person.id === userId) return;

      const userDiv = document.createElement("div");
      userDiv.classList.add("user-item");

      const imageDiv = document.createElement("div");
      imageDiv.id = "image";

      const namePara = document.createElement("p");
      namePara.textContent = person.name;

      userDiv.append(imageDiv, namePara);
      sidebar.appendChild(userDiv);
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
  }
};

// Handle profile update
const handleProfileUpdate = async (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const newPassword = passwordInput.value;

  // Validate input
  nameError.textContent = "";
  passwordError.textContent = "";

  if (currentUser.name == name && currentUser.password == newPassword) {
    showNotification("No changes has been made!", notification);
    return;
  }

  if (!isNotEmpty(name)) {
    nameError.textContent = "Name is required!";
    return;
  }
  if (!isNotEmpty(newPassword)) {
    passwordError.textContent = "Password is required!";
    return;
  }
  if (!isValidPassword(newPassword)) {
    passwordError.textContent = "Password must be at least 6 characters!";
    return;
  }

  try {
    const updatedUser = await updateUserDetails(userId, name, newPassword);
    if (updatedUser) {
      currentUser = updatedUser;

      // Save user details to local storage expect password
      const { password, ...newUserDetails } = updatedUser;
      localStorage.setItem("user", JSON.stringify(newUserDetails));
      showNotification("Update Successful.", notification);
      passwordInput.type = "password";
    }
  } catch (error) {
    console.error("Error updating user details:", error);
  }
};

// Toggle password visibility
toggleBtn.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  toggleBtn.textContent = isPassword ? "Hide" : "Show";
});

// Initialize the page
initializeUserProfile();
populateUsersSidebar();
document
  .getElementById("personal-details")
  .addEventListener("submit", handleProfileUpdate);
