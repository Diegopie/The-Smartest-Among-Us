// * Global Variables
// ** Store User Selection for API Req
let userCat;
let userDif;
// ** Store API Res
const quizRes = [];
let randomize = Boolean;

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
    renderQuiz();
  });
}

// ** Display parsedQuiz to the Screen
function renderQuiz() {
  // *** Variables
  for (let i = 0; i < quizRes[0].length; i++) {
    const resPath = quizRes[0][i];
    const domPath = $(".question")[i].children;
    // console.log($(".question"));
    // console.dir($(".question")[i].children);
    // $(".question")[i].value = resPath[i].question;
    // ** Update Question
    // console.log(domPath[1]);
    domPath[1].value = resPath.question;
    // Update Correct Answer
    domPath[3].value = resPath.correct_answer;
    // Update Incorrect Answer
    domPath[5].value = resPath.incorrect_answers[0];
    domPath[6].value = resPath.incorrect_answers[1];
    domPath[7].value = resPath.incorrect_answers[2];
  }
}

// ** Store Questions In Ong for Our API
function parseUser() {
  const questionNum = 1;
  // Get Quiz Name
  const quizName = $("#qname")[0].value;
  // console.log(quizName);
  // Get Account ID
  // Questions Array
  const questions = [];
  for (let i = 0; i < 10; i++) {
    const domPath = $(".question")[i].children;
    // console.dir(domPath[1]);
    // Get Question
    const question = domPath[1].value;
    // console.log(question);
    // Get Correct
    const correct = domPath[3].value;
    // console.log(correct);
    // Get Incorrect
    const wrong = [domPath[5].value, domPath[6].value, domPath[7].value];
    // console.log(wrong);
    const curQuest = {
      questionNum: questionNum,
      question: question,
      correctAnswer: correct,
      wrongAnswers: wrong,
    };
    questions.push(curQuest);
  }
  const apiObj = {
    quizName: quizName,
    randomize: randomize,
    accountID: 1,
    questions: questions,
  };
  console.log(apiObj);
}

// parseUser();
// creating a quiz
// POST data structure from front end
// const newQuiz = {
//   quizName: "whatever",
//   randomize: true,
//   accountID: 1,
//   questions: [
//     {
//       questionNum: 1,
//       question: "some text",
//       correctAnswer: "this one's right",
//       wrongAnswers: ["wrong", "nope", "git out"],
//     },
//   ],
// };

// * Click Listeners
// ** Display Catagories on Yes
$("#randyes").click((event) => {
  event.preventDefault();
  $("#rand").addClass("hide");
  randomize = true;
});
// ** Hide Buttons on No
$("#randno").click((event) => {
  event.preventDefault();
  $("#rand").addClass("hide");
  randomize = false;
});
// ** Display Catagories on Yes
$("#autoyes").click((event) => {
  event.preventDefault();
  $("#auto").addClass("hide");
  $("#settings").removeClass("hide");
});
// ** Hide Buttons on No
$("#autono").click((event) => {
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

$("#api").click((event) => {
  event.preventDefault();
  parseUser();
});
