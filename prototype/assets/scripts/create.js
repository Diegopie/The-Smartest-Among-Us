// * Click Listeners
// ** Display Catagories on Yes
$("#yes").click((event) => {
  event.preventDefault();
  $("#auto").addClass("hide");
  $("#cat").removeClass("hide");
});
// ** Hide Buttons on No
$("#no").click((event) => {
  event.preventDefault();
  $("#auto").addClass("hide");
});
// ** Store the Category A User Clicks
$("#cat").click((event) => {
  event.preventDefault();
  console.log(event.target.innerText);
  const userCat = event.target.innerText;
  apiCall(userCat)
  $("#cat").addClass("hide");
})


function apiCall(cat) {
  console.log("Make trivia api req using userCat: ", cat);
}