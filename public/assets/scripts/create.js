// * Global Variables
// ** Store User Selection for API Req
let userCat;
let userDif;
const quizRes = [];
// ** Store API Res
let randomize = Boolean;

// * Functions
// ** Test API Res
function testAPI() {
  const url = "https://opentdb.com/api.php?amount=10&type=multiple";
  $.ajax({
    url: url,
    method: "GET",
  }).then((res) => {
    // Push res to quizRes then run renderQuiz to update DOM
    quizRes.push(res.results);
    renderQuiz();
  });
}

// ** Display parsedQuiz to the Screen
function renderQuiz() {
  // *** Loop through the Length of the quizRes array
  for (let i = 0; i < quizRes[0].length; i++) {
    const resPath = quizRes[0][i];
    const domPath = $(".question")[i].children;
    // console.dir($(".question")[i].children);
    // *** Update Question
    domPath[1].value = resPath.question;
    // *** Update Correct Answer
    domPath[3].value = resPath.correct_answer;
    // *** Update Incorrect Answer
    domPath[5].value = resPath.incorrect_answers[0];
    domPath[6].value = resPath.incorrect_answers[1];
    domPath[7].value = resPath.incorrect_answers[2];
  }
  // Show Update DOM Elements
  $("#quiz-cont").removeClass("hide");
  $("#api").removeClass("hide");
}
console.dir($("#quiz-cont")[0].children.length);
// ** Store Questions In Ong for Our API
function parseUser() {
  // *** Variables
  // Checks how many question containers are on the dom
  const quizLength = $("#quiz-cont")[0].children.length;
  // Api requires questionNumber, this will increment by one during a for loop
  let questionNum = 1;
  // *** Store DOM Elements
  // Get Quiz Name
  const quizName = $("#qname")[0].value;
  // Get Account ID??
  // *** Get All Questions Containers
  // Objects created in for loop will be pushed here
  const questions = [];
  for (let i = 0; i < quizLength; i++) {
    const domPath = $(".question")[i].children;
    // Get Question
    const question = domPath[1].value;
    // Get Correct
    const correct = domPath[3].value;
    // Get Incorrect
    const wrong = [domPath[5].value, domPath[6].value, domPath[7].value];
    // Create question object
    const curQuest = {
      questionNum: questionNum,
      question: question,
      correctAnswer: correct,
      wrongAnswers: wrong,
    };
    // Push to questions array and increment questionNum
    questions.push(curQuest);
    questionNum++;
  }
  // *** Create Object for Our Server API
  const apiObj = {
    quizName: quizName,
    randomize: randomize,
    accountID: 1,
    questions: questions,
  };
  // ONCE we are server connected, we can pass this object to an API Req
  console.log(apiObj);
}

// * Click Listeners
// ** Set Randomize to True
$("#randyes").click((event) => {
  event.preventDefault();
  $("#rand").addClass("hide");
  $("#auto").removeClass("hide");
  randomize = true;
});
// ** Set Randomize to False
$("#randno").click((event) => {
  event.preventDefault();
  $("#rand").addClass("hide");
  $("#auto").removeClass("hide");
  randomize = false;
});
// ** Display Catagories on Yes
$("#autoyes").click((event) => {
  event.preventDefault();
  $("#auto").addClass("hide");
  $("#settings").removeClass("hide");
});
// ** Hide Buttons and Display Questions Containers on No
$("#autono").click((event) => {
  event.preventDefault();
  $("#auto").addClass("hide");
  $("#quiz-api").removeClass("hide");
  $("#quiz-cont").removeClass("hide");
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
// Make Trivia API Req
$("#sub").click((event) => {
  event.preventDefault();
  $("#settings").addClass("hide");
  testAPI();
});
// Make Server API Req
$("#api").click((event) => {
  event.preventDefault();
  parseUser();
});
