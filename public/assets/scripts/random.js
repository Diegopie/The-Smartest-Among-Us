// * Global Variables
// score-cont
let score = 0;
let curQuest = 0;
let catSelect = false;
let difSelect = false;
let strQuestions;
// ** Store User Selection for API Req
let userCat;
const catValue = {
  Animals: 27,
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
// ** Adds Class When User Click and API Option and Removes Class For Any Previous Click
function userSelect(elem) {
  const path = elem.parentElement.children;
  for (let i = 0; i < path.length; i++) {
    if ($(path[i]).hasClass("selected")) {
      $(path[i]).removeClass("selected");
    }
  }
  $(elem).addClass("selected");
}
// ** Make API Req Directly to Their Site
function testSelect() {
  const url =
    "https://opentdb.com/api.php?amount=" +
    strQuestions +
    "&category=" +
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

// ** parse text to make nonsense reaadable
function decode(text) {
  const el = document.createElement("div");
  el.innerHTML = text;
  text = el.innerText;
  return text;
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
    curA.push(decode(curQ.correct_answer));
    // Loop through incorrect_answers res to add each index to curA;
    for (let j = 0; j < curQ.incorrect_answers.length; j++) {
      curA.push(decode(curQ.incorrect_answers[j]));
    }
    // *** Randomize the all questions array
    shuffleArray(curA);
    // *** Check Where Correct Answer is in the Array
    curA.forEach((item, v) => {
      if (item === curQ.correct_answer) {
        correctA = v;
        return v;
      }
    });

    // *** Create Parsed Object and Push to parsedQuiz
    const curObj = {
      question: decode(curQ.question),
      answers: curA,
      correct: correctA,
    };
    parsedQuiz.push(curObj);
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
  $("#quiz").removeClass("hide");
  // *** Click Listener to Check Correct Answer
  // console.log("Correct", curQaArr.correct);
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
    const corTitle = $("<h4>").addClass("spacer").text("Correct Answer:");
    const corAnsCont = $("<div>").addClass("row");
    const corAns = $("<h5>").addClass("col cor-ans").text(answ);
    corAnsCont.append(corAns);
    corCon.append(corTitle, corAnsCont);
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
// console.dir($("#score-cont")[0].children[0]);

// ** Prompt User If They WAnt to Play Again or Save the Quiz
function saveQuiz() {
  // Update Final Score
  $("#score-cont")[0].children[0].textContent = "Final Score: " + score;
  // *** Create Container for User Options
  const saveCont = $("<section>").addClass("row cont sv-cont");
  // *** Containers for Text and Append to saveCont
  const titlesCont = $("<article>").addClass("col-12");
  const title = $("<h3>").text("Would You Like to Save This Quiz?");
  const p = $("<p>").text(
    "If you're not logged in, you must do so or create an account"
  );
  titlesCont.append(title, p);
  saveCont.append(titlesCont);
  // *** Create Container for Buttons and Append to saveCont
  const submCont = $("<article>").addClass("row");
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
    if (localStorage.getItem("currentUserId")) {
      event.preventDefault();
      localStorage.setItem("saved-quiz", JSON.stringify(trivApi));
      window.location.replace("/create");
    } else {
      localStorage.setItem("saved-quiz", JSON.stringify(trivApi));
      $("#signUpModal").modal("show");
    }
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
// ** Store Value for Quiz Length
$("#amnt-sbt").click((event) => {
  event.preventDefault();
  strQuestions = parseInt($("#amnt-val").val());
  // console.log("How Many Q: " + strQuestions);
  $("#amnt").addClass("hide");
  $("#cat-cont").removeClass("hide");
});
// ** Store the Category A User Clicks
$(".cat").click((event) => {
  event.preventDefault();
  userCat = event.target.innerText;
  userSelect(event.target);
  catSelect = true;
  // console.log("User Category: ", userCat);
});

// ** Store User Difficulty
$(".dif").click((event) => {
  event.preventDefault();
  userDif = event.target.innerText;
  userSelect(event.target);
  difSelect = true;
  // console.log("User Difficulty: ", userDif);
});

$("#sub").click((event) => {
  event.preventDefault();
  if (!catSelect || !difSelect) {
    $("#valText")[0].textContent = "Please Select a Category and Difficulty";
    $("#validateModal").modal();
    return;
  }
  $("#settings").addClass("hide");
  $("#score-cont").removeClass("hide");
  testSelect();
});
