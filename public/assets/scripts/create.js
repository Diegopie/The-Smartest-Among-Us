// * Global Variables
// ** Store User Selections
let strQuestions;
let randomize = Boolean;
let userCat;
let userDif;
let quizRes;
// ** Store API Res

// * Functions
// ** Test API Res
function testAPI() {
  const url =
    "https://opentdb.com/api.php?amount=" + strQuestions + "&type=multiple";
  $.ajax({
    url: url,
    method: "GET",
  }).then((res) => {
    // Push res to quizRes then run renderQuiz to update DOM
    quizRes = res.results;
    renderQuiz();
  });
}

// makeQuesCont(2);
// ** Create Question Containers
function makeQuesCont(value) {
  for (let i = 0; i < value; i++) {
    // *** Create Elements
    const qNum = i + 1;
    const qCont = $("<article>").addClass("cont question");
    const qTitle = $("<h3>").text("Question " + qNum);
    const btn = $("<button>").addClass("button q-rmv").text("X");
    const qInpt = $("<input>").attr({ type: "text", name: "q" + qNum });
    const corTitle = $("<h3>").text("Correct Answer");
    const cInpt = $("<input>").attr({
      type: "text",
      name: "q" + qNum + "-crt",
    });
    const inTitle = $("<h3>").text("Imposter Answers");
    qCont.append(qTitle, btn, qInpt, corTitle, cInpt, inTitle);
    for (let j = 1; j < 4; j++) {
      const iInpt = $("<input>").attr({
        type: "text",
        name: "q" + qNum + "-wrg" + j,
      });
      qCont.append(iInpt);
    }
    // *** Append to DOM
    $("#quiz-cont").append(qCont);
  }
}

// ** Display parsedQuiz to the Screen
function renderQuiz() {
  // *** Loop through the Length of the quizRes array
  for (let i = 0; i < quizRes.length; i++) {
    const resPath = quizRes[i];
    const domPath = $(".question")[i].children;
    // console.dir(domPath);
    // *** Update Question
    domPath[2].value = resPath.question;
    // *** Update Correct Answer
    domPath[4].value = resPath.correct_answer;
    // *** Update Incorrect Answer
    domPath[6].value = resPath.incorrect_answers[0];
    domPath[7].value = resPath.incorrect_answers[1];
    domPath[8].value = resPath.incorrect_answers[2];
  }
  // Show Update DOM Elements
  $("#quiz-cont").removeClass("hide");
  $("#api").removeClass("hide");
}


// ** Store Questions In Obj for Our API
function parseUser() {
  // *** Variables
  // Checks how many question containers are on the dom
  const quizLength = $("#quiz-cont")[0].children.length;
  // Api requires questionNumber, this will increment by one during a for loop
  let questionNum = 1;
  // *** Store DOM Elements
  // Get Quiz Name
  const quizName = $("#qname")[0].value;
  // GET ACCOUNT ID??
  // *** Get All Questions Containers
  // Objects created in for loop will be pushed here
  const questions = [];
  for (let i = 0; i < quizLength; i++) {
    const domPath = $(".question")[i].children;
    // console.log(domPath);
    // Get Question
    const question = domPath[2].value;
    // Get Correct
    const correct = domPath[4].value;
    // Get Incorrect
    const wrong = [domPath[6].value, domPath[7].value, domPath[8].value];
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
  console.log("-- Obj for API --");
  console.log(apiObj);
}

// * Click Listeners
// ** Store How Many Questions To Render
$("#amnt-sbt").click((event) => {
  event.preventDefault();
  strQuestions = parseInt($("#amnt-val").val());
  console.log("How Many Q: " + strQuestions);
  $("#amnt").addClass("hide");
  $("#rand").removeClass("hide");
  makeQuesCont(strQuestions);
});
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
  console.log("User Category: ", userCat);
});
// ** Store User Difficulty
$(".dif").click((event) => {
  event.preventDefault();
  userDif = event.target.innerText;
  console.log("User Difficulty: ", userDif);
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

$(".q-rmv").click((event) => {
  event.preventDefault();
  // console.dir(event.target.parentElement);
  event.target.parentElement.remove();
});
