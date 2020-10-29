const db = require("../models");

module.exports = (app) => {
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
  app.post("/api/quiz", (req, res) => {
    db.Quiz.create({
      quizName: req.body.quizName,
      randomize: req.body.randomize,
      accountId: req.body.accountId,
    })
      .then(
        req.body.questions.forEach((entry) => {
          db.Question.create({
            quizId: entry.quizId,
            question: entry.question,
            correctAnswer: entry.correctAnswer,
            wrongAnswer: entry.wrongAnswers[0],
            wrongAnswer2: entry.wrongAnswers[1],
            wrongAnswer3: entry.wrongAnswers[2],
          });
        })
      )
      .then((result) => {
        res.json(result);
      });
  });
};
