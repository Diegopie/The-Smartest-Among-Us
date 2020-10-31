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
  // renderQuiz()
  renderQuizBetter();
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

let curQuest = 0;
function renderQuizBetter() {
  // *** Bring in Updated Value of curQuest, This Will Be Used for parsedQuiz Index
  curQuest
  console.log("current question indexc: ",curQuest);
  // *** Variables to Create Quiz DOM
  let curQaArr = parsedQuiz[curQuest]
  let qaContain = $("<article>").addClass("cont qa");
  let question = $("<h3>").text(curQaArr.question);
  let answers = $("<ul>").addClass("check").attr("id", "answers");
  // *** Append Elements to Each Other then To DOM
  qaContain.append(question, answers);
  for (let i = 0; i < curQaArr.answers.length; i++) {
    let curAns = $("<li>").text(curQaArr.answers[i]).attr("value", i).addClass("ans");
    answers.append(curAns);
  }
  $("#quiz").append(qaContain);
  // makeButt("Fuck Me")
  // *** Click Listener to Check Correct Answer
  console.log(curQaArr.correct);
  $(".ans").click((event) => {
    // disable click listener if user has already clicked
    if ($("#answers").hasClass("check")) {
      // check correct/wrong answer
      let userSelect = event.target.attributes[0].value;
      if (userSelect == curQaArr.correct) {
        $(event.target).css("background-color", "green")
        $("#answers").removeClass("check");
        makeButt("Correct!");
      } else {
        $(event.target).css("background-color", "red")
        $("#answers").removeClass("check")
        makeButt("Wrong!");
      }
    } else {
      console.log($("#answers"));
      console.log("fuck you");
      return
    }
  })
}
testAPI()
// renderQuizBetter();

function makeButt(value) {
  let buttCont = $("<article>").addClass("cont");
  let result = $("<h3>").text(value);
  let butt = $("<button>").addClass("button nxt").text("Next");
  buttCont.append(result, butt);
  $(".qa").append(buttCont);
  curQuest++
  $(".nxt").click((event) => {
    event.preventDefault();
    renderQuizBetter();
  })
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
// ** Store User Difficulty
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

