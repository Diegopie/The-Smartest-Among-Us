$(() => {
  // * Global Variables
  // ** Used to Check if User Clicked an API Setting Button
  let catSelect = false;
  let difSelect = false;
  // ** Checks If Validator Ran
  let valCheck = Boolean;
  // ** Store User Selections
  let strQuestions;
  let randomize = Boolean;
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
  let quizRes;
  // ** Store User ID
  let userID;
  let accountPage;

  // * Functions
  // ** Get Value of Logged in User; Stop Page if not logged in; Get Quiz From Local if there, else load normally
  pageChecks();
  function pageChecks() {
    const username = localStorage.getItem("accountName");
    if (username === null) {
      $("#name").addClass("hide");
      $("#valText")[0].textContent =
        "You Must Login or Create an account to continue";
      $("#validateModal").modal();
      return;
    }

    userID = localStorage.getItem("currentUserId");
    // $("#acntLink").attr("href", "/account=" + username);
    accountPage = "/account=" + username;
    // ** Check for Quiz From Play Random
    const localQuiz = JSON.parse(localStorage.getItem("saved-quiz"));
    // Display Settings elements if local storage is empty
    if (localQuiz === null) {
      $("#amnt").removeClass("hide");
      return;
    }
    quizRes = localQuiz;
    localStorage.removeItem("saved-quiz");
    // $("#rand").removeClass("hide");
    makeQuesCont(quizRes.length);
    renderQuiz();
  }

  // ** Create Question Containers Based Off User Selection
  function makeQuesCont(value) {
    // Loop For As Many Times The User Wants To Create A Question
    for (let i = 0; i < value; i++) {
      // *** Create Elements
      const qNum = $("#quiz-cont")[0].children.length + 1;
      // Contain All Elements
      const qCont = $("<section>").addClass("row cont question");
      // Contain X Button
      const xCont = $("<article>").addClass("col-12");
      const xDiv = $("<div>").addClass("row");
      const btn = $("<button>").addClass("button q-rmv").text("X");
      xDiv.append(btn);
      xCont.append(xDiv);
      // Contain Question
      const quesCont = $("<article>").addClass("col-7 col-md-4 spacer");
      const quesTitle = $("<h3>")
        .text("Question " + qNum)
        .addClass("col-12");
      const queInpCont = $("<div>").addClass("row");
      const quesInpt = $("<textarea>").attr({
        type: "text",
        name: "q" + qNum,
        rows: "4",
        cols: "50",
      });
      // const quesInpt = $("<input>").attr({ type: "text", name: "q" + qNum });
      queInpCont.append(quesInpt);
      quesCont.append(quesTitle, queInpCont);
      // Correct Question
      const corCont = $("<article>").addClass("col-7 col-md-4 spacer");
      const corTitle = $("<h3>").text("Correct Answer");
      const corInpCont = $("<div>").addClass("row");
      const corInpt = $("<input>").attr({
        type: "text",
        name: "q" + qNum + "-crt",
      });
      corInpCont.append(corInpt);
      corCont.append(corTitle, corInpCont);
      // Incorrect Answers
      const incCont = $("<article>").addClass("col-7 col-md-4 spacer");
      const incTitle = $("<h3>").text("Imposter Answers");
      const incInpCont = $("<div>").addClass("row");
      // Loop to Create the Three Imposter Question Elements and Append to qCont (To account for true/false, this loop needs to be based on the question amount for a corresponding quiz index)
      for (let j = 1; j < 4; j++) {
        const incInp = $("<input>").attr({
          type: "text",
          name: "q" + qNum + "-wrg" + j,
        });
        incInpCont.append(incInp);
      }
      incCont.append(incTitle, incInpCont);
      // *** All Containers to qCont
      qCont.append(xCont, quesCont, corCont, incCont);
      // *** Append to DOM
      $("#quiz-cont").append(qCont);
    }
    $(".q-rmv").click((event) => {
      event.preventDefault();
      // console.log(event.target.parentElement.parentElement.parentElement);
      event.target.parentElement.parentElement.parentElement.remove();
      updateQuesTitles();
    });
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
      quizRes = res.results;
      renderQuiz();
    });
  }

  // ** parse text to make nonsense reaadable
  function decode(text) {
    const el = document.createElement("div");
    el.innerHTML = text;
    text = el.innerText;
    return text;
  }

  // ** Display API Res to DOM (This depends on children elements. Any adding additional elements to the makeQuestCont() will break this!)
  function renderQuiz() {
    // *** Loop through the Length of the quizRes array
    for (let i = 0; i < quizRes.length; i++) {
      // ** Variables
      const resPath = quizRes[i];
      const domPath = $(".question")[i].children;
      // *** Update Question
      domPath[1].children[1].children[0].value = decode(resPath.question);
      // *** Update Correct Answer
      domPath[2].children[1].children[0].value = decode(resPath.correct_answer);
      // *** Update Incorrect Answer
      domPath[3].children[1].children[0].value = decode(
        resPath.incorrect_answers[0]
      );
      domPath[3].children[1].children[1].value = decode(
        resPath.incorrect_answers[1]
      );
      domPath[3].children[1].children[2].value = decode(
        resPath.incorrect_answers[2]
      );
    }
    // *** Display Quiz Container, New Q Container Button, and Submit Button
    $("#quiz-cont").removeClass("hide");
    $("#btns").removeClass("hide");
  }

  // ** Update the Question Number When a User Deletes a Question Container
  function updateQuesTitles() {
    // *** Variables
    const quizLength = $("#quiz-cont")[0].children.length;
    // console.log(quizLength);
    let questionNum = 1;
    // *** Loop Through the Amount of Question Containers Currently on the DOM and Update Them From 1
    for (let i = 0; i < quizLength; i++) {
      const domPath = $(".question")[i].children[1].children[0];
      domPath.textContent = "Question " + questionNum;
      questionNum++;
    }
  }

  // ** Check if Inputs Are Blank
  function validator(elem) {
    const valPath = elem.value;
    if (valPath === "") {
      $(elem).addClass("valid");
      elem.placeholder = "This cannot be empty :(";
      valCheck = true;
    } else {
      $(elem).removeClass("valid");
    }
  }

  // ** Store Questions In Obj for Our API
  function parseUser() {
    // *** Variables
    valCheck = false;
    // Checks how many question containers are on the dom
    const quizLength = $("#quiz-cont")[0].children.length;
    // Api requires questionNumber, this will increment by one during a for loop
    let questionNum = 1;
    // *** Store DOM Elements
    // Get Quiz Name
    const quizName = $("#qname")[0];
    if (quizName.value === "") {
      quizName.placeholder = "This cannot be empty :(";
      $(quizName).addClass("valid");
      valCheck = true;
    } else {
      $(quizName).removeClass("valid");
    }
    // GET ACCOUNT ID??
    // *** Get All Questions Containers
    // Objects created in for loop will be pushed here
    const questions = [];
    for (let i = 0; i < quizLength; i++) {
      const domPath = $(".question")[i].children;
      // Get Question
      const question = domPath[1].children[1].children[0];
      validator(question);
      // Get Correct
      const correct = domPath[2].children[1].children[0];
      validator(correct);
      // Get Incorrect
      validator(domPath[3].children[1].children[0]);
      validator(domPath[3].children[1].children[1]);
      validator(domPath[3].children[1].children[2]);
      const wrong = [
        domPath[3].children[1].children[0].value.trim(),
        domPath[3].children[1].children[1].value.trim(),
        domPath[3].children[1].children[2].value.trim(),
      ];
      // Create question object
      const curQuest = {
        questionNum: questionNum,
        question: question.value.trim(),
        correctAnswer: correct.value.trim(),
        wrongAnswers: wrong,
      };
      // Push to questions array and increment questionNum
      questions.push(curQuest);
      questionNum++;
    }
    if (valCheck) {
      $("#valText")[0].textContent = "You missed some fields!";
      $("#validateModal").modal();
      return;
    }
    // *** Create Object for Our Server API
    const apiObj = {
      quizName: quizName.value.trim(),
      randomize: randomize,
      accountID: userID,
      questions: questions,
    };
    // ONCE WE ARE SERVER CONNECTED, WE CAN PASS THIS OBJECT TO AN API REQ
    $.post("/api/quiz", apiObj).then(() => {
      // console.log(apiObj);
      $("#valText")[0].textContent = "Your Quiz Is Saved!";
      $(".link").removeClass("hide");
      $("#validateModal").modal();
    });
  }

  // * Click Listeners
  // ** Create and Append Question Containers Based On User Selection
  $("#amnt-sbt").click((event) => {
    event.preventDefault();
    strQuestions = parseInt($("#amnt-val").val());
    // console.log("How Many Q: " + strQuestions);
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
    $("#quiz-cont").removeClass("hide");
    $("#btns").removeClass("hide");
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

  //** Make Trivia API Req
  $("#sub").click((event) => {
    event.preventDefault();
    if (!catSelect || !difSelect) {
      $("#valText")[0].textContent = "Please Select a Category and Difficulty";
      $("#validateModal").modal();
      return;
    }
    $("#settings").addClass("hide");
    testSelect();
  });

  // ** Make Server API Post Req
  $("#api").click((event) => {
    event.preventDefault();
    parseUser();
  });

  // ** Add A New Question Container
  $("#new-btn").click((event) => {
    event.preventDefault();
    makeQuesCont(1);
  });
  // ** Send to Create Page
  $(".link").click((event) => {
    event.preventDefault();
    location.href = accountPage;
  });
});
