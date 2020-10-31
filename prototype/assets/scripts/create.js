// * Global Variables
// ** Store User Selection for API Req
let userCat;
let userDif;
// ** Store API Res
const quizRes = [];
const apiQuiz = [];

// * Functions
// ** Test API Res
function testAPI() {
  const url = "https://opentdb.com/api.php?amount=10&type=multiple";
  $.ajax({
    url: url,
    method: "GET",
  }).then((res) => {
    // console.log(res.results);
    quizRes.push(res.results);
    // console.log(quizRes);
    parseRes();
  });
}

// ** Display parsedQuiz to the Screen
function renderQuiz() {
  // *** Variables
  for (let i = 0; i < quizRes[0].length; i++) {
    let resPath = quizRes[0][i];
    let domPath = $(".question")[i].children;
    console.log($(".question"));
    console.dir($(".question")[i].children);
    // $(".question")[i].value = resPath[i].question;
    // ** Update Question
    console.log(domPath[1]);
    domPath[1].value = resPath.question;
    // Update Correct Answer
    domPath[3].value = resPath.correct_answer;
    // Update Incorrect Answer
    domPath[5].value = resPath.incorrect_answers[0];
    domPath[6].value = resPath.incorrect_answers[1];
    domPath[7].value = resPath.incorrect_answers[2];
  }
}

// * Click Listeners
// ** Display Catagories on Yes
$("#yes").click((event) => {
  event.preventDefault();
  $("#auto").addClass("hide");
  $("#settings").removeClass("hide");
});
// ** Hide Buttons on No
$("#no").click((event) => {
  event.preventDefault();
  $("#auto").addClass("hide");
});
// ** Store the Category A User Clicks
$(".cat").click((event) => {
  event.preventDefault();
  userCat = event.target.innerText;
  console.log(userCat);
});
// ** Store User Difficulty
$(".dif").click((event) => {
  event.preventDefault();
  userDif = event.target.innerText;
  console.log(userDif);
});

$("#sub").click((event) => {
  event.preventDefault();
  $("#settings").addClass("hide");
  testAPI();
});
