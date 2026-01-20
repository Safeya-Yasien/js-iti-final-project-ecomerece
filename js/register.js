// Register Form Submission Handler
var registerForm = document.getElementById("registerForm");

// 2. Get Error Elements
var usernameError = document.getElementById("usernameError");
var emailError = document.getElementById("emailError");
var passwordError = document.getElementById("passwordError");

// 4. Validation Checks
var isValid = true;

// 1. Get Values
var usernameInput = document.getElementById("username");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var roleInput = document.getElementById("role");

//  function to update status
function updateStatus(inputEl, errorEl, isValid, errorMsg) {
  if (inputEl.value === "") {
    errorEl.innerHTML = "";
    inputEl.style.borderColor = "#ddd";
  } else if (isValid) {
    errorEl.innerHTML = "Valid";
    errorEl.style.color = "green";
    inputEl.style.borderColor = "green";
  } else {
    errorEl.innerHTML = errorMsg;
    errorEl.style.color = "red";
    inputEl.style.borderColor = "red";
  }
}

// Dynamic Username
username.addEventListener("input", function () {
  const isValid = validateUsername(this.value);
  updateStatus(this, usernameError, isValid, "Use 3-15 letters/numbers only.");
});

// Dynamic Email
emailInput.addEventListener("input", function () {
  const isValid = ValidateEmail(this.value);
  updateStatus(this, emailError, isValid, "Enter a valid @gmail.com address.");
});

// Dynamic Password
password.addEventListener("input", function () {
  const isValid = PasswordValidation(this.value);
  updateStatus(
    this,
    passwordError,
    isValid,
    "8-15 chars, Uppercase, Lowercase, Digit, & Special Char.",
  );
});

// 3. Form Submission Event
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Re-validate everything one last time before saving
  var isUserValid = validateUsername(usernameInput.value);
  var isEmailValid = ValidateEmail(emailInput.value);
  var isPassValid = PasswordValidation(passwordInput.value);

  if (isUserValid && isEmailValid && isPassValid) {
    const userData = {
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      role: roleInput.value,
    };

    localStorage.setItem(usernameInput.value, JSON.stringify(userData));
    window.location.href = "login.html";
  }
});

// --- Validation Functions ---

function validateUsername(username) {
  // Simple: Letters and numbers, 3-15 chars
  return /^[a-zA-Z0-9]{3,15}$/.test(username);
}

function ValidateEmail(email) {
  // Simplified Gmail pattern
  // Requirements: characters + @gmail.com
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
}

function PasswordValidation(password) {
  // Your requested strong pattern
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  return passwordRegex.test(password);
}
