import { isLoggedIn, logoutUser } from "../utils/auth.js";

// Redirect to login if not logged in
if (!isLoggedIn()) {
  window.location.href = "login.html";
} else {
  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById(
    "welcome-message"
  ).innerText = `Welcome, ${user.name}!`;
}

document.getElementById("logout").addEventListener("click", () => {
  logoutUser();
  window.location.href = "login.html";
});
