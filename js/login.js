// Get the login form element
var loginForm = document.getElementById("loginForm");

// Get the email and password input fields
var emailTxt = document.getElementById("email");
var passwordTxt = document.getElementById("password");
// console.log(emailTxt);

var data = JSON.parse(localStorage.getItem("userData"));
// console.log(data.email);
// console.log(data.password);

//  Get error display elements
var passwordError = document.getElementById("passwordError");
var emailError = document.getElementById("emailError");

// Add an event listener to handle form submission
loginForm.addEventListener("submit", function (e) {
  // Validate email and password
  var validatedEmail = ValidateEmail(emailTxt.value);
  var validatedPassword = PasswordValidation(passwordTxt.value);
  e.preventDefault();
  // Check if the user is an admin
  if (validatedEmail && validatedPassword) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "http://127.0.0.1:5500/final_project_js_ecomerece/js/adminData.json",
    );
    xhr.onload = function () {
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        var foundAdmin = false;
        for (user of data) {
          if (
            user.Email == emailTxt.value &&
            user.password == passwordTxt.value
          ) {
            foundAdmin = true;
            break;
          }
        }
        if (!foundAdmin) {
          e.preventDefault();
          checkRegularUser();
        } else {
          var data = {
            email: emailTxt.value,
            password: passwordTxt.value,
          };
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", `${JSON.stringify(data)}`);
          location.assign(
            "http://127.0.0.1:5500/final_project_js_ecomerece/admin.html",
          );
        }
      }
    };
    xhr.send();
  } else {
    document.getElementById("errormessage").innerText =
      "Wrong Email or password";
  }
});

// login Admin Login

function checkRegularUser() {
  // Validate email and password
  var validatedEmail = ValidateEmail(emailTxt.value);
  var validatedPassword = PasswordValidation(passwordTxt.value);
  // Your code to check regular user login
  if (validatedEmail && validatedPassword) {
    if (data.email === emailTxt.value && data.password === passwordTxt.value) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "user.html";
    } else {
      document.getElementById("errormessage").innerText =
        "error  Email or Password";
    }
  } else {
    document.getElementById("errormessage").innerText =
      "Account not found. Please Register.";
  }
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

// Dynamic Email
emailTxt.addEventListener("input", function () {
  const isValid = ValidateEmail(this.value);
  updateStatus(this, emailError, isValid, "Enter a valid @gmail.com address.");
});

// Dynamic Password
passwordTxt.addEventListener("input", function () {
  const isValid = PasswordValidation(this.value);
  updateStatus(
    this,
    passwordError,
    isValid,
    "8-15 chars, Uppercase, Lowercase, Digit, & Special Char.",
  );
});

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

// print data for testing
// console.log("Registered User Data:", data.Email, data.password);
