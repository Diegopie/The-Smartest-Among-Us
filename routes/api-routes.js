const db = require("../models");

module.exports = function (app) {
  // return all quizzes owned by this user
  app.get("/api/:userId", (req, res) => {
    db.Quiz.findAll({
      where: {
        accountId: req.params.userId,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // creating a quiz
  // POST data structure from front end
  // const newQuiz = {
  //    quizName: "whatever",
  //    randomize: true,
  //    accountID: 1
  //    questions: [
  //     {
  //       question: "some text",
  //       correctAnswer: "this one's right",
  //       wrongAnswers: ["wrong", "nope", "git out"]
  //     },
  //     {
  //       question: ,
  //       correctAnswer: ,
  //       wrongAnswers: []
  //     }
  // ]
  // }
  // creating a quiz
  app.post("/api/quiz", (req, res) => {
    let quizID;
    db.Quiz.create({
      quizName: req.body.quizName,
      randomize: req.body.randomize,
      accountID: req.body.accountID,
    }).then((result) => {
      quizID = result.quizID;
      console.log(quizID);
      console.log(result);
      res.json(result);
    });
    // .then(
    //   req.body.questions.forEach((entry) => {
    //     db.Question.create({
    //       quizID,
    //       question: entry.question,
    //       correctAnswer: entry.correctAnswer,
    //       wrongAnswer: entry.wrongAnswers[0],
    //       wrongAnswer2: entry.wrongAnswers[1],
    //       wrongAnswer3: entry.wrongAnswers[2],
    //     });
    //   })
    // )
    // .then((result) => {
    //   res.json(result);
    // });
  });
};
