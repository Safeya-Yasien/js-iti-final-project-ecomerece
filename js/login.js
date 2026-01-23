// Get the login form element
var loginForm = document.getElementById("loginForm");

// Get the email and password input fields
var emailTxt = document.getElementById("email");
var passwordTxt = document.getElementById("password");
var data = JSON.parse(localStorage.getItem("users"));

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
    xhr.open("GET", "js/adminData.json");
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
          location.assign("admin/index.html");
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
    var foundUser = data.find(
      (user) =>
        user.email === emailTxt.value && user.password === passwordTxt.value,
    );
    if (foundUser) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "index.html";
    } else {
      document.getElementById("errormessage").innerText =
        "error  Email or Password";
    }
  } else {
    document.getElementById("errormessage").innerText =
      "Account not found. Please Register.";
  }
}

// Dynamic Email
["input", "blur"].forEach((event) => {
  emailTxt.addEventListener(event, function () {
    const isValid = ValidateEmail(this.value);
    updateStatus(
      this,
      emailError,
      isValid,
      "Enter a valid @gmail.com address.",
    );
  });
});

// Dynamic Password
["input", "blur"].forEach((event) => {
  passwordTxt.addEventListener(event, function () {
    const isValid = PasswordValidation(this.value);
    updateStatus(
      this,
      passwordError,
      isValid,
      "8-15 chars, Uppercase, Lowercase, Digit, & Special Char.",
    );
  });
});
