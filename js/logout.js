// Handle Logout Functionality
var logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
});
