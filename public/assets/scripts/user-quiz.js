// * Global Variables
let score = 0;
let curQuest = 0;

// ** Store API Res

const quizRes = [];
// I originally pushed the trivia api res to quizRes, rather than setting it equal to a variable like with trivia API. This meant I had to add [0] anytime I wanted to use the api res but this caused issus when I was trying to store quizRes in local storage and play the same quiz. It would keep adding an empty index. I solved it by doing what I should have from the start and sending trivAPi (stores api.res) so local storage, so it would behave the same way as doing an actual api call. It just more effort than I want to put in to fix it
let trivApi;
const parsedQuiz = [];

// * Functions
// ** Check Local Storage If User Wanted to Play a Quiz Again
checkLocal();
function checkLocal() {
  const localQuiz = JSON.parse(localStorage.getItem("saved-quiz"));
  // Display Settings elements if local storage is empty
  if (localQuiz === null) {
    $("#settings").removeClass("hide");
    return;
  }
  quizRes.push(localQuiz);
  localStorage.removeItem("saved-quiz");
  parseRes();
}

// ** Parse API Res To Work Better With Updating the DOM and Store in parsedQuiz
function parseRes() {
  // *** Loop Through All Questions in QuizRes
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
    // *** Randomize the all questions array
    shuffleArray(curA);
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
    console.log(parsedQuiz);
  }
  // *** With parsedQuiz Fully Populated, render data to DOM
  renderQuizBetter();
}

// ** Render Quiz to DOM
function renderQuizBetter() {
  // *** Bring in Updated Value of curQuest, This Will Be Used for parsedQuiz Index
  curQuest;
  // console.log("current question index: ", curQuest);
  // *** Check If No More Questions Remain then Display UI Prompt in saveQuiz()
  if (curQuest === parsedQuiz.length) {
    saveQuiz();
    return;
  }
  // *** Variables to Create Quiz DOM
  const curQaArr = parsedQuiz[curQuest];
  const contain = $("<article>").addClass("row cont qa");
  const queAnsCont = $("<article>").addClass("col-7 col-md-4");
  const question = $("<h3>").text(curQaArr.question);
  const ansCont = $("<div>").addClass("row");
  const answers = $("<ul>").addClass("check").attr("id", "answers");
  // *** This Will Be Sent to makeButt to display the correct answer if the user is wrong
  const correctAns = curQaArr.answers[curQaArr.correct];
  // *** Append Elements to Each Other then to DOM
  ansCont.append(answers);
  queAnsCont.append(question, ansCont);
  contain.append(queAnsCont);
  for (let i = 0; i < curQaArr.answers.length; i++) {
    const curAns = $("<li>")
      // .text(curQaArr.answers[i])
      .attr("value", i)
      .addClass("ans");
    const aTag = $("<a>")
      .attr({
        value: i,
        href: "#nxtBtn",
      })
      .text(curQaArr.answers[i]);
    curAns.append(aTag);
    answers.append(curAns);
  }
  $("#quiz").append(contain);
  // *** Click Listener to Check Correct Answer
  console.log("Correct", curQaArr.correct);
  $(".ans").click((event) => {
    // disable click listener if user has already clicked
    if ($("#answers").hasClass("check")) {
      // check correct/wrong answer and display appropriate response in makeButt()
      const userSelect = event.target.attributes[0].value;
      if (parseInt(userSelect) === curQaArr.correct) {
        $(event.target).css("background-color", "green");
        $("#answers").removeClass("check");
        makeButt("Correct!");
        score = score + 10;
        $("#score")[0].innerText = score;
      } else {
        $(event.target).css("background-color", "red");
        $("#answers").removeClass("check");
        makeButt("Wrong!", correctAns);
      }
    } else {
      return;
    }
  });
}

// ** Creates a Button That Shows Users Info and Can Load the Next Question
function makeButt(value, answ) {
  // *** Append A Button To DOM
  const nextCont = $("<article>")
    .addClass("col-7 col-md-4")
    .attr("id", "nxtBtn");
  const result = $("<h3>").text(value);
  const buttCont = $("<div>").addClass("row");
  const butt = $("<button>").addClass("button nxt").text("Next");
  buttCont.append(butt);
  nextCont.append(result, buttCont);
  $(".qa").append(nextCont);
  // *** If User is Wrong, Display the Correct Answer
  if (answ !== undefined) {
    const corCon = $("<article>").addClass("col-7 col-md-4");
    const corTitle = $("<h4>").text("Correct Answer:");
    const corAns = $("<h5>").addClass("cor-ans").text(answ);
    corCon.append(corTitle, corAns);
    $(".qa").append(corCon);
  }
  // Increase the Value of curQuest So Next Question Will Load When User Clicks
  curQuest++;
  $(".nxt").click((event) => {
    event.preventDefault();
    $(".qa").remove();
    renderQuizBetter();
  });
}

// ** Prompt User If They WAnt to Play Again or Save the Quiz
function saveQuiz() {
  // Update Final Score
  $("#scr")[0].children[0].textContent = "Final Score: " + score;
  // *** Create Container for User Options
  const plyAgnCont = $("<section>").addClass("row cont sv-cont");
  // *** Create Container for Buttons and Append to plyAgnCont
  const btnCont = $("<article>").addClass("row");
  const butNo = $("<button>").addClass("button ply-again").text("Play Again");
  btnCont.append(butNo);
  plyAgnCont.append(btnCont);
  // *** Append New Elements to DOM
  $("#quiz").append(plyAgnCont);
  // *** Click Listeners for New Button
  // Quiz Is Stored In Local Storage to Play Again
  $(".ply-again").click((event) => {
    event.preventDefault();
    location.reload();
  });
}

// ** Randomize array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// * Click Listeners

$("#play").click((event) => {
  event.preventDefault();
  $("#settings").addClass("hide");
  $("#scr").removeClass("hide");
  // testAPI();
  testSelect();
});

// USE THIS FOR THE PLAY SCRIPT 😂
// const testHigh = [
//   {
//     username: "Hello",
//     score: 30,
//   },
//   {
//     username: "Biitch",
//     score: 100,
//   },
// ];
// function makeHigh(check) {
//   const highCont = $("<section>").addClass("cont");
//   const titlesCont = $("<article>");
//   const title = $("<h3>").text("High Scores");
//   highCont.append(titlesCont, title);
//   const table = $("<table>").addClass("cont");
//   for (let i = 0; i < testHigh.length; i++) {
//     const tr = $("<tr>");
//     const user = $("<th>").text(testHigh[i].username);
//     console.log(user);
//     const score = $("<th>").text(testHigh[i].score);
//     console.log(score);
//     tr.append(user, score);
//     console.log(tr);
//     table.append(tr);
//   }
//   highCont.append(table);
//   if (check === "yes") {
//     let subHighCont = $("<article>");
//     let inp = $("<input>").attr("type", "text").text("Enter a Username to Save!");
//     let butt = $("<button>").addClass("button").text("Submit");
//     // <input type="text" id="q1" name="q1"></input>
//     subHighCont.append(inp, butt);
//     highCont.append(subHighCont);
//   }
//   $("#quiz").append(highCont);
// }
