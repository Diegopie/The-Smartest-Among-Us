const db = require("../models");

module.exports = function (app) {
  // create new user account entry
  app.post("/api/user", (req, res) => {
    db.Account.create({
      username: req.body.username,
      adminKey: req.body.adminKey,
    }).then((result) => {
      res.json(result);
    });
  });

  // return all quizzes owned by this user
  app.get("/api/:accountId", (req, res) => {
    db.Quiz.findAll({
      where: {
        accountId: req.params.accountId,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // get quiz from quizID
  app.get("/api/:quizID", (req, res) => {
    db.Quiz.findOne({
      where: {
        quizID: req.params.quizID,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // get quiz questions from quizID
  app.get("api/quiz/:quizID", (req, res) => {
    db.Question.findAll({
      where: {
        quizID: req.params.quizID,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // creating a quiz
  // POST data structure from front end
  // const newQuiz = {
  //   quizName: "whatever",
  //   randomize: true,
  //   accountID: 1,
  //   questions: [
  //     {
  //       questionNum: 1,
  //       question: "some text",
  //       correctAnswer: "this one's right",
  //       wrongAnswers: ["wrong", "nope", "git out"],
  //     },
  //   ],
  // };
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

  // enter the score
  app.post("/api/newScore/:quizID", (req, res) => {
    db.Score.create({
      username: req.body.username,
      score: req.body.score,
      quizID: req.params.quizID,
    }).then((result) => {
      res.json(result);
    });
  });

  // get scores for specific quiz
  app.get("api/hiScores/:quizID", (req, res) => {
    db.Score.findAll({
      where: {
        quizID: req.params.quizID,
      },
      order: [["score", "DESC"]],
      limit: 10,
    }).then((result) => {
      res.json(result);
    });
  });
};
