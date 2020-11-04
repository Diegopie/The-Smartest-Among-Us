$(() => {
  // * Global Variables
  // ** Checks If Validator Ran
  let valCheck = Boolean;
  // ** Store User Selections
  let strQuestions;
  let randomize = Boolean;
  let userCat;
  const catValue = {
    Mythology: 20,
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

  // * Functions
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
      const btn = $("<button>").addClass("q-rmv").text("X");
      xDiv.append(btn);
      xCont.append(xDiv);
      // Contain Question
      const quesCont = $("<article>").addClass("col-7 col-md-4 spacer");
      const quesTitle = $("<h3>")
        .text("Question " + qNum)
        .addClass("col-12");
      const queInpCont = $("<div>").addClass("row");
      const quesInpt = $("<input>").attr({ type: "text", name: "q" + qNum });
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
      console.log(event.target.parentElement.parentElement.parentElement);
      event.target.parentElement.parentElement.parentElement.remove();
      updateQuesTitles();
    });
  }

  // ** Test API Res
  // function testAPI() {
  //   const url =
  //     "https://opentdb.com/api.php?amount=" + strQuestions + "&type=multiple";
  //   // "https://opentdb.com/api.php?amount=" + 2 + "&type=multiple";
  //   $.ajax({
  //     url: url,
  //     method: "GET",
  //   }).then((res) => {
  //     // Push res to quizRes then run renderQuiz to update DOM
  //     quizRes = res.results;
  //     renderQuiz();
  //   });
  // }

  function testSelect() {
    const url =
      "https://opentdb.com/api.php?amount=" +
      strQuestions +
      "&category=" +
      catValue[userCat] +
      "&difficulty=" +
      difValue[userDif] +
      "&type=multiple";
    console.log(url);
    $.ajax({
      url: url,
      method: "GET",
    }).then((res) => {
      console.log(res);
      console.log(res.results);
      quizRes = res.results;
      renderQuiz();
    });
  }

  // ** Test API Res
  // function testAPI() {
  //   const url =
  //     "https://opentdb.com/api.php?amount=" + strQuestions + "&type=multiple";
  //   // "https://opentdb.com/api.php?amount=" + 2 + "&type=multiple";
  //   $.ajax({
  //     url: url,
  //     method: "GET",
  //   }).then((res) => {
  //     // Push res to quizRes then run renderQuiz to update DOM
  //     quizRes = res.results;
  //     renderQuiz();
  //   });
  // }
  // ** Display API Res to DOM (This depends on children elements. Any adding additional elements to the makeQuestCont() will break this!)
  function renderQuiz() {
    // *** Loop through the Length of the quizRes array
    for (let i = 0; i < quizRes.length; i++) {
      // ** Variables
      const resPath = quizRes[i];
      const domPath = $(".question")[i].children;
      // console.dir(domPath);
      // *** Update Question
      domPath[1].children[1].children[0].value = resPath.question;
      // *** Update Correct Answer
      domPath[2].children[1].children[0].value = resPath.correct_answer;
      // *** Update Incorrect Answer
      domPath[3].children[1].children[0].value = resPath.incorrect_answers[0];
      domPath[3].children[1].children[1].value = resPath.incorrect_answers[1];
      domPath[3].children[1].children[2].value = resPath.incorrect_answers[2];
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
      console.log(domPath);
      // console.log(domPath);
      // console.log(domPath[0].textContent);
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
  // console.dir($(".question")[0].children);
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
      // console.log(domPath);
      // Get Question
      const question = domPath[1].children[1].children[0];
      console.log("question: ", question);
      validator(question);
      // Get Correct
      const correct = domPath[2].children[1].children[0];
      console.log("Correct: ", correct);
      validator(correct);
      // Get Incorrect
      validator(domPath[3].children[1].children[0]);
      validator(domPath[3].children[1].children[1]);
      validator(domPath[3].children[1].children[2]);
      const wrong = [
        domPath[3].children[1].children[0].value,
        domPath[3].children[1].children[1].value,
        domPath[3].children[1].children[2].value,
      ];
      // Create question object
      const curQuest = {
        questionNum: questionNum,
        question: question.value,
        correctAnswer: correct.value,
        wrongAnswers: wrong,
      };
      // Push to questions array and increment questionNum
      questions.push(curQuest);
      questionNum++;
    }
    if (valCheck) {
      window.alert("Get rekt");
      return;
    }
    // *** Create Object for Our Server API
    const apiObj = {
      quizName: quizName.value,
      randomize: randomize,
      accountID: 1,
      questions: questions,
    };
    // ONCE WE ARE SERVER CONNECTED, WE CAN PASS THIS OBJECT TO AN API REQ
    $.post("/api/quiz", apiObj).then(() => {
      console.log("work??");
    });
    console.log("-- Obj for API --");
    console.log(apiObj);
  }

  // * Click Listeners
  // ** Create and Append Question Containers Based On User Selection
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
    $("#quiz-cont").removeClass("hide");
    $("#btns").removeClass("hide");
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
    // testAPI();
    testSelect();
  });
  // Make Server API Req
  $("#api").click((event) => {
    event.preventDefault();
    parseUser();
  });
  // Add A New Question Container
  $("#new-btn").click((event) => {
    event.preventDefault();
    makeQuesCont(1);
  });
});
