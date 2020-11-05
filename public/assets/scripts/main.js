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

$(".quizStart").on("click", (event) => {
  event.preventDefault();
  const quizID = event.target.getAttribute("data-id");
  const quizName = event.target.getAttribute("data-name");
  console.log(quizID);
  $("#btns").empty();
  $("#title").text(quizName);
  const url = `/api/questions/${quizID}`;
  $.get(url);
});

$(".deleteQuiz").on("click", (event) => {
  event.preventDefault();
  const quizID = event.target.getAttribute("data-id");
  const url = `/api/${quizID}`;
  $.delete(url);
  location.reload();
});
