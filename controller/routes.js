const express = require("express");
const router = express.Router();
const db = require("../models");

// 6-20: html routes
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/play", (req, res) => {
  res.render("play");
});

router.get("/playglobal", (req, res) => {
  db.Quiz.findAll({
    where: {
      accountID: "1",
    },
  }).then((results) => {
    // const hbsObj = {
    //   quizzes: results,
    // };
    const data = [];
    results.forEach((result) => {
      data.push(result.dataValues)
    });
    const hbsObj = {
      quizzes: data,
    };
    // console.log(results);
    res.render("playglobal", hbsObj);
  });
});

router.get("/account", (req, res) => {
  res.render("account");
});

router.get("/create", (req, res) => {
  res.render("create");
});

// *** api routes ***
// create new user account entry
router.post("/api/user", (req, res) => {
  db.Account.create({
    username: req.body.username,
    adminKey: req.body.adminKey,
  }).then((result) => {
    res.json(result);
  });
});

// return admin (our saved) quizzes
// this assumes that "admin" is the first account saved,
// we'll need to initialize the JAWS database with that account
router.get("/api/admin", (req, res) => {
  
});

// return all quizzes owned by this user
router.get("/api/:accountId", (req, res) => {
  db.Quiz.findAll({
    where: {
      accountID: req.params.accountId,
    },
  }).then((result) => {
    res.json(result);
  });
});

// get quiz from quizID
router.get("/api/:quizID", (req, res) => {
  db.Quiz.findOne({
    where: {
      quizID: req.params.quizID,
    },
  }).then((result) => {
    res.json(result);
  });
});

// get quiz questions from quizID
router.get("api/quiz/:quizID", (req, res) => {
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
router.post("/api/quiz", (req, res) => {
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
router.post("/api/newScore/:quizID", (req, res) => {
  db.Score.create({
    username: req.body.username,
    score: req.body.score,
    quizID: req.params.quizID,
  }).then((result) => {
    res.json(result);
  });
});

// get scores for specific quiz
router.get("api/hiScores/:quizID", (req, res) => {
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

module.exports = router;
