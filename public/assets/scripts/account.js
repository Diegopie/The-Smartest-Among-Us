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
  // console.log(quizID);
  const url = `/api/quizID/${quizID}`;
  // console.log(url);
  $.ajax({
    method: "DELETE",
    url: url,
    data: {
      accountName: localStorage.getItem("accountName"),
    },
    // }).done(() => {
    //   window.location.reload();
  });
});
