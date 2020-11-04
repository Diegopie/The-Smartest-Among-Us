$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $(".login");
  const emailInput = $("#username-input");
  const passwordInput = $("#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    console.log(userData);

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res.id);
        localStorage.setItem("currentUserId", res.id);
        console.log(localStorage.getItem("currentUserId"));
        window.location.replace("/account");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
