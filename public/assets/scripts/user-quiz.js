// * Global Variables
let score = 0;
let curQuest = 0;
let quizID;
let quizName;
let highScores;

// ** Store API Res

const quizRes = [];

const parsedQuiz = [];

// * Functions
// ** Check Local Storage If User Wanted to Play a Quiz Again

function getScores(check) {
  $.get("/api/hiScores/" + quizID).then((res) => {
    if (res[0] === undefined) {
      highScores = [
        {
          username: "Be the fist to add a score",
          score: "",
        },
      ];
      // return;
    } else {
      const parsedHigh = [];
      for (let i = 0; i < res.length; i++) {
        const newObj = {
          username: res[i].username,
          score: res[i].score,
        };
        parsedHigh.push(newObj);
      }
      highScores = parsedHigh;
    }
    if (check) {
      $(".high").remove();
      makeHigh(false);
    }
  });
}

// ** Make GET Req Based on User Selection and Push Res to quizRes[]
function getQuiz(id, name) {
  $("#btns").empty();
  $("#rubbish").text("'s");
  $("#title").text(name + " quiz");
  const url = `/api/questions/${id}`;
  $.get(url).then((res) => {
    // console.log(res);
    quizRes.push(res);
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

// ** Render Quiz to DOM
function renderQuizBetter() {
  // *** Bring in Updated Value of curQuest, This Will Be Used for parsedQuiz Index
  curQuest;
  // console.log("current question index: ", curQuest);
  // *** Check If No More Questions Remain then Display UI Prompt in saveQuiz()
  if (curQuest === parsedQuiz.length) {
    makeHigh(true);
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
  $("#play-cont").removeClass("hide");
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

// ** Creat Container to Display High Scores
function makeHigh(check) {
  $("#score-cont")[0].children[0].textContent = "Final Score: " + score;
  // *** Create Container for High Score
  const highCont = $("<section>").addClass("row cont high");
  const article = $("<article>").addClass("col-12");
  const title = $("<h3>").addClass("spacer").text("High Scores");
  const div = $("<div>").addClass("row");
  article.append(title, div);
  highCont.append(article);
  const ul = $("<ul>").addClass("");
  // console.log(highScores);
  for (let i = 0; i < highScores.length; i++) {
    const li = $("<li>").text(
      highScores[i].username + ": " + highScores[i].score
    );
    ul.append(li);
  }
  div.append(ul);
  // *** Create Container for Submitting a High Score
  if (check) {
    const subHighCont = $("<article>").addClass("col-12 spacer");
    const inpCont = $("<div>").addClass("row");
    const inp = $("<input>").attr({
      id: "high-val",
      type: "text",
      placeholder: "Enter a name to Save!",
    });
    const butt = $("<button>").addClass("button sv-high").text("Save");
    inpCont.append(inp, butt);
    subHighCont.append(inpCont);
    highCont.append(subHighCont);
  }
  // Create Container for Play Again
  const btnCont = $("<article>").addClass("col-12 spacer");
  const butNoCont = $("<div>").addClass("row");
  const butNo = $("<button>").addClass("button ply-again").text("Play Again");
  butNoCont.append(butNo);
  btnCont.append(butNoCont);
  highCont.append(btnCont);
  // *** Append to DOM
  $("#main").append(highCont);

  // saveQuiz();
  $(".ply-again").click((event) => {
    event.preventDefault();
    // getQuiz(quizID, quizName);  // This works but score containers need to be reset and high score needs to be remove()
    location.reload();
  });

  $(".sv-high").click((event) => {
    event.preventDefault();
    const userName = $("#high-val")[0].value.trim();
    if (userName === "") {
      $("#valText")[0].textContent = "Please Enter a Username";
      $("#validateModal").modal();
      return;
    }
    const scoreAPI = {
      username: userName,
      score: score,
      quizID: quizID,
    };
    // console.log(scoreAPI);
    $.post("/api/newScore/" + quizID, scoreAPI).then(() => {
      getScores(true);
      $("#valText")[0].textContent = "Your Score Has Been Saved!";
      $("#validateModal").modal();
    });
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
$(".quizStart").on("click", (event) => {
  event.preventDefault();
  quizID = event.target.getAttribute("data-id");
  quizName = event.target.getAttribute("data-name");
  // console.log(quizID);
  getScores();
  getQuiz(quizID, quizName);
});

$("#play").click((event) => {
  event.preventDefault();
  $("#quiz").removeClass("hide");
  $("#play-cont").remove();
});
