$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $(".signup");
  const emailInputCreate = $("#username-input-create");
  const passwordInputCreate = $("#password-input-create");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      email: emailInputCreate.val().trim(),
      password: passwordInputCreate.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInputCreate.val("");
    passwordInputCreate.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password,
    })
      .then((res) => {
        localStorage.setItem("currentUserId", res.id);
        localStorage.setItem("accountName", email);
        const accountURL = "/account=" + email;
        console.log(localStorage.getItem("currentUserId"));
        window.location.replace(accountURL);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
