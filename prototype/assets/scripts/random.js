// * Global Variables
// ** Store User Selection for API Req
let userCat;
let userDif;
// ** Store API Res
let quizRes = [];
let parsedQuiz = [];
    // console.log(quizRes[0].length);


// * Functions
// ** Test API Res
function testAPI () {
  const url = "https://opentdb.com/api.php?amount=10&type=multiple"
  $.ajax({
    url: url,
    method: "GET"
  }).then (function(res) {
        // console.log(res.results);
    quizRes.push(res.results);
        // console.log(quizRes);
    parseRes()
  })
}
// ** Parse API Res and Store in parsedQuiz
function parseRes () {
  for (let i = 0; i < quizRes[0].length; i++) {
    // *** Variables
    let curQ = quizRes[0][i];
    const curA = []
    let correctA;

    // *** Sort Questions into a Single Array of curA
    curA.push(curQ.correct_answer)
    // Loop through incorrect_answers res to add each index to curA;
    for (let j = 0; j < curQ.incorrect_answers.length; j++) {
      curA.push(curQ.incorrect_answers[j])
    }
        // console.log(curA);

    // *** Randomize the array
    shuffleArray(curA);
        // console.log(curA);

    // *** Check Where Correct Answer is in the Array
    curA.forEach(function(item, v){
      if (item == curQ.correct_answer) {
            // console.log(v);
        correctA = v;
        return v
      }
    });

    // *** Create Parsed Object and Push to parsedQuiz
    let curObj = {
      question: curQ.question,
      answers: curA,
      correct: correctA,
    };
        
    parsedQuiz.push(curObj)
        // console.log(parsedQuiz);
  };
  renderQuiz()
};

function renderQuiz() {
  // *** Variables
  let domQues = $("#quiz")[0].children
      // console.dir(domQues);
      // console.log(parsedQuiz);
  // *** Loop Through parsedQuiz To Update DOM
  for (let i = 0; i < parsedQuiz.length; i++) {
        // console.log("-- Quest --");
    // **** Update Question DOM Element
    let curQPath = domQues[i].children[0];
    curQPath.innerText = parsedQuiz[i].question;
    // **** Update Each li Answer in the DOM
    let curAnsAr = domQues[i].children[1].children.length
    for (let j = 0; j < curAnsAr; j++) {
          // console.log("-- Ans --");
      let curAnsPath = domQues[i].children[1].children[j];
          // console.log(curAnsPath);
      curAnsPath.innerText = parsedQuiz[i].answers[j];
    }
  }
  $("#quiz").removeClass("hide")
}

function renderQuizBetter() {

}




// ** Randomize array in-place using Durstenfeld shuffle algorithm 
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// Click Listeners
// ** Store the Category A User Clicks
$(".cat").click((event) => {
  event.preventDefault();
  userCat = event.target.innerText;
      console.log(userCat);
});

$(".dif").click((event) => {
  event.preventDefault();
  userDif = event.target.innerText;
      console.log(userDif);
});

$("#sub").click((event) => {
  event.preventDefault();
  $("#settings").addClass("hide");
  testAPI()
});

