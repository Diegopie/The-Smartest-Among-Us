// * Global Variables
let score = 0;
let curQuest = 0;
// ** Store User Selection for API Req
let userCat;
const catValue = {
  Art: 25,
  Film: 11,
  Games: 15,
  Sports: 21,
  Anime: 31,
  Books: 10,
  Music: 12,
  Math: 19,
};
let userDif;
const difValue = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
};
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
// ** Test API Res
// function testAPI() {
//   const url = "https://opentdb.com/api.php?amount=3&type=multiple";
//   $.ajax({
//     url: url,
//     method: "GET",
//   }).then((res) => {
//     // :)  So, if I had stored res.results in a variable rather than push to an array to begin with, I would have had to deal with index 0 all the time
//     trivApi = res.results;
//     quizRes.push(res.results);
//     parseRes();
//   });
// }
// Test API Res with Category and Difficulty
function testSelect() {
  const url =
    "https://opentdb.com/api.php?amount=10&category=" +
    catValue[userCat] +
    "&difficulty=" +
    difValue[userDif] +
    "&type=multiple";
  $.ajax({
    url: url,
    method: "GET",
  }).then((res) => {
    // :)  So, if I had stored res.results in a variable rather than push to an array to begin with, I would have had to deal with index 0 all the time
    trivApi = res.results;
    quizRes.push(res.results);
    parseRes();
  });
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
    // console.log(parsedQuiz);
  }
  // *** With parsedQuiz Fully Populated, render data to DOM
  renderQuizBetter();
}

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
  const qaContain = $("<article>").addClass("cont qa");
  const question = $("<h3>").text(curQaArr.question);
  const answers = $("<ul>").addClass("check").attr("id", "answers");
  // *** This Will Be Sent to makeButt to display the correct answer if the user is wrong
  const correctAns = curQaArr.answers[curQaArr.correct];
  // *** Append Elements to Each Other then to DOM
  qaContain.append(question, answers);
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
  $("#quiz").append(qaContain);
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
  const buttCont = $("<article>").addClass("cont").attr("id", "nxtBtn");
  const result = $("<h3>").text(value);
  const butt = $("<button>").addClass("button nxt").text("Next");
  buttCont.append(result, butt);
  $(".qa").append(buttCont);
  // *** If User is Wrong, Display the Correct Answer
  if (answ !== undefined) {
    const corTitle = $("<h4>").text("Correct Answer:");
    const corAns = $("<h5>").addClass("cor-ans").text(answ);
    $(".qa").append(corTitle, corAns);
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
  const saveCont = $("<section>").addClass("cont sv-cont");
  // *** Containers for Text and Append to saveCont
  const titlesCont = $("<article>");
  const title = $("<h3>").text("Would You Like to Save This Quiz?");
  const p = $("<p>").text(
    "If you're not logged in, you must do so or create an account"
  );
  saveCont.append(titlesCont, title, p);
  // *** Create Container for Buttons and Append to saveCont
  const submCont = $("<article>");
  const butYes = $("<button>").addClass("button sv-yes").text("Yes");
  const butNo = $("<button>").addClass("button sv-again").text("Play Again");
  const butPlay = $("<button>").addClass("button sv-play").text("Play Another");
  submCont.append(butYes, butNo, butPlay);
  saveCont.append(submCont);
  // *** Append New Elements to DOM
  $("#quiz").append(saveCont);
  // *** Click Listeners for New Button
  // ?? Save Quiz Will Either Require a Login or Creating Account, data can be saved to local storage or sent to the db
  $(".sv-yes").click((event) => {
    event.preventDefault();
    localStorage.setItem("saved-quiz", JSON.stringify(trivApi));
  });
  // Quiz Is Stored In Local Storage to Play Again
  $(".sv-again").click((event) => {
    event.preventDefault();
    localStorage.setItem("saved-quiz", JSON.stringify(trivApi));
    location.reload();
  });
  // Page Reload To Create A New Quiz
  $(".sv-play").click((event) => {
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
  $("#scr").removeClass("hide");
  // testAPI();
  testSelect();
});

// * Code I wrote but don't want to delete 😅
// ** v1 of rendering a quiz, the html was coded with 10 q containers
// function renderQuiz() {
//   // *** Variables
//   let domQues = $("#quiz")[0].children;
//   // console.dir(domQues);
//   // console.log(parsedQuiz);
//   // *** Loop Through parsedQuiz To Update DOM
//   for (let i = 0; i < parsedQuiz.length; i++) {
//     // console.log("-- Quest --");
//     // **** Update Question DOM Element
//     let curQPath = domQues[i].children[0];
//     curQPath.innerText = parsedQuiz[i].question;
//     // **** Update Each li Answer in the DOM
//     let curAnsAr = domQues[i].children[1].children.length
//     for (let j = 0; j < curAnsAr; j++) {
//           // console.log("-- Ans --");
//       let curAnsPath = domQues[i].children[1].children[j];
//           // console.log(curAnsPath);
//       curAnsPath.innerText = parsedQuiz[i].answers[j];
//     }
//   }
//   $("#quiz").removeClass("hide");
// }

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
