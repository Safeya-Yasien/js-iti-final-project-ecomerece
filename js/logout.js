// Handle Logout Functionality
var logoutBtn = document.getElementsByClassName("logout")[0];

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  console.log("logout");
  window.location.href = "../login.html";
});
