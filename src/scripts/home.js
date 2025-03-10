import { isLoggedIn, logoutUser } from "./utils/auth.js";
import { showModal, hideModal, redirectTo } from "./utils/helper.js";

// Select DOM elements
const welcomeMessage = document.getElementById("welcome-message");
const modal = document.getElementById("modal");
const logoutBtn = document.getElementById("logout");
const profileBtn = document.getElementById("profile-btn");
const confirmLogoutBtn = document.getElementById("confirm-logout");
const cancelLogoutBtns = document.querySelectorAll(
  "#cancel-logout, #cancel-icon"
);

// Redirect to login if not authenticated
if (!isLoggedIn()) {
  redirectTo("login.html");
} else {
  displayUserInfo();
}

// Display user info
function displayUserInfo() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    welcomeMessage.innerText = `Welcome, ${user.name}!`;
  }
}

// Handle logout
function handleLogout() {
  logoutUser();
  redirectTo("login.html");
}

// Event Listeners
logoutBtn.addEventListener("click", () => showModal(modal));
confirmLogoutBtn.addEventListener("click", () => {
  handleLogout();
  hideModal(modal);
});
cancelLogoutBtns.forEach((btn) =>
  btn.addEventListener("click", () => hideModal(modal))
);
profileBtn.addEventListener("click", () => redirectTo("profile.html"));
