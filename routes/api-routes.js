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
  //       questionNum: ,
  //       question: "some text",
  //       correctAnswer: "this one's right",
  //       wrongAnswers: ["wrong", "nope", "git out"]
  //     },
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
      req.body.questions.forEach((entry) => {
        db.Question.create({
          quizID,
          questionNum: entry.questionNum,
          question: entry.question,
          correctAnswer: entry.correctAnswer,
          wrongAnswer: entry.wrongAnswers[0],
          wrongAnswer2: entry.wrongAnswers[1],
          wrongAnswer3: entry.wrongAnswers[2],
        });
      });
      res.json(result);
    });
  });
};
