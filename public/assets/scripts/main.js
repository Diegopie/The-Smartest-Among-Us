const createButt = $("#createButt");
const accountEl = $("#accountLink");
const loginButt = $("#loginButt");
const signButt = $("#signButt");
const modSignButt = $("#modSignButt");
const modLoginButt = $("#modLoginButt");
const logoutButt = $("#logoutButt");

// const accountEl = `
//   <a class="dropdown-item d-none" href="/account" id="accountLink">Account</a>
//   `;

logoutButt.on("click", () => {
  localStorage.clear();
  // localStorage.setItem("accountName", null);
  // localStorage.setItem("currentUserId", null);
  createButt.addClass("d-none");
  accountEl.addClass("d-none");
  logoutButt.addClass("d-none");
  loginButt.removeClass("d-none");
  signButt.removeClass("d-none");
});

modLoginButt.on("submit", login());
modSignButt.on("submit", login());
// start();

function start() {
  if (localStorage.getItem("accountName") !== null) {
    const email = localStorage.getItem("accountName");
    const accountURL = "/account=" + email;
    accountEl.attr("href", accountURL);
    createButt.removeClass("d-none");
    accountEl.removeClass("d-none");
    logoutButt.removeClass("d-none");
  }
}

function login() {
  if (localStorage.getItem("accountName")) {
    loginButt.addClass("d-none");
    signButt.addClass("d-none");
    start();
  }
}

$("#createButton").click((event) => {
  if (localStorage.getItem("currentUserId")) {
    event.preventDefault();
    window.location.replace("/create");
  } else {
    $("#signUpModal").modal("show");
  }
});

$("#alreadyHaveAccount").click((event) => {
  event.preventDefault();
  $("#signUpModal").modal("hide");
  $("#loginModal").modal("show");
});
