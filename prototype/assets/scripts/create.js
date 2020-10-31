// * Global Variables
// ** Store User Selection for API Req
let userCat;
let userDif;
// ** Store API Res
const quizRes = [];
const parsedQuiz = [];

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

// ** Parse API Res and Store in parsedQuiz
function parseRes() {
  for (let i = 0; i < quizRes[0].length; i++) {
    // *** Variables
    const curQ = quizRes[0][i];
    const curA = [];
    let correctA;

    // *** Sort Questions into a Single Array of curA
    curA.push(curQ.correct_answer);
    // Loop through incorrect_answers res to add each index to curA;
    for (let j = 0; j < curQ.incorrect_answers.length; j++) {
      curA.push(curQ.incorrect_answers[j]);
    }
    // console.log(curA);

    // *** Randomize the array
    shuffleArray(curA);
    // console.log(curA);

    // *** Check Where Correct Answer is in the Array
    curA.forEach((item, v) => {
      if (item === curQ.correct_answer) {
        // console.log(v);
        correctA = v;
        return v;
      }
    });

    // *** Create Parsed Object and Push to parsedQuiz
    const curObj = {
      question: curQ.question,
      answers: curA,
      correct: correctA,
    };
    parsedQuiz.push(curObj);
    // console.log(parsedQuiz);
  }
  renderQuiz();
}
// ** Display parsedQuiz to the Screen
function renderQuiz() {
  // *** Variables
  for (let i = 0; i < 1; i++) {
    console.dir($(".question"));
    $(".question")[i].innerText = "Fuck";
    // $(".question")[i].placeholder = "Fuck";
    console.dir($(".question")[i]);
  }
}
testAPI();
// ** Randomize array in-place using Durstenfeld shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
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
