let viewUser = window.location.pathname;
viewUser = viewUser.slice(9);

const loggedIn = () => {
  if (localStorage.getItem("accountName")) {
    if (viewUser === localStorage.getItem("accountName")) {
      $(".deleteQuiz").removeClass("d-none");
    }
  }
};

loggedIn();

$(".deleteQuiz").on("click", (event) => {
  event.preventDefault();
  const quizID = event.target.getAttribute("data-id");
  const element = event.target.parentElement.parentElement;
  // I wanted to run the remove after a successful api call but it doesn't work within .done()
  $(element).remove();
  // console.log(quizID);
  const url = `/api/quizID/${quizID}`;
  // console.log(url);
  $.ajax({
    method: "DELETE",
    url: url,
    data: {
      accountName: localStorage.getItem("accountName"),
    },
  }).done(() => {
    $("#buttonOptions").addClass("d-none");
  });
});
