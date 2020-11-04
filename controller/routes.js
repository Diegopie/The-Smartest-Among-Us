const express = require("express");
const passport = require("../config/passport");
const router = express.Router();
const db = require("../models");

// working
router.get("/", (req, res) => {
  res.render("index");
});

// working
router.get("", (req, res) => {
  res.render("index");
});

// working
router.get("/play", (req, res) => {
  res.render("play");
});

// working
router.get("/playRandom", (req, res) => {
  res.render("play-random");
});

// working
router.get("/account", (req, res) => {
  res.render("account");
});

// working
router.get("/create", (req, res) => {
  res.render("create");
});

// working
// play global quizzes i.e., built-in quizzes
// this assumes that "admin" is the first User saved,
// we'll need to initialize the JAWS database with that User
router.get("/playGlobal", (req, res) => {
  db.Quiz.findAll({
    where: {
      accountID: "1",
    },
  }).then((results) => {
    const data = [];
    results.forEach((result) => {
      data.push(result.dataValues);
    });
    const hbsObj = {
      quizzes: data,
    };
    res.render("quizzes", hbsObj);
  });
});

// working
// display all quizzes from a specific User
// (allows for easy sharing of user-created content)
// shareable link is https://the-smartest-amoung-us.herokuapp.com/account=[username]
router.get("/account=:username", (req, res) => {
  db.User.findOne({
    where: {
      username: req.params.username,
    },
    include: [db.Quiz],
  }).then((result) => {
    result = result.dataValues;
    console.log(result);
    const hbsObj = {
      username: req.params.username,
      quizzes: [],
    };
    result.Quizzes.forEach((quiz) => {
      quiz = quiz.dataValues;
      console.log(quiz);
      hbsObj.quizzes.push(quiz);
    });
    res.render("user", hbsObj);
  });
});

// ****************************
// **** working in Postman ****
// ****************************
// *** api routes ***
// create new user User entry
router.post("/api/user", (req, res) => {
  db.User.create({
    username: req.body.username,
    password: req.body.password,
  }).then((result) => {
    res.json(result);
  });
});

// ****************************
// **** working in Postman ****
// ****************************
// get quiz from quizID
router.get("/api/quiz/:quizID", (req, res) => {
  db.Quiz.findOne({
    where: {
      quizID: req.params.quizID,
    },
  }).then((result) => {
    res.json(result);
  });
});

// ****************************
// **** working in Postman ****
// ****************************
// get quiz questions from quizID
router.get("/api/questions/:quizID", (req, res) => {
  db.Question.findAll({
    where: {
      quizID: req.params.quizID,
    },
    include: [db.Quiz],
  }).then((questions) => {
    // console.log(questions);
    const questionArr = [];
    questions.forEach((question) => {
      const qObj = {};
      question = question.dataValues;
      qObj.correct_answer = question.correctAnswer;
      qObj.incorrect_answers = [];
      qObj.incorrect_answers.push(question.wrongAnswer);
      qObj.incorrect_answers.push(question.wrongAnswer2);
      qObj.incorrect_answers.push(question.wrongAnswer3);
      qObj.question = question.question;
      questionArr.push(qObj);
    });
    // const quizname = questions[0].Quiz.dataValues.quizName;
    // console.log(quizname);
    res.json(questionArr);
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

// ****************************
// **** working in Postman ****
// ****************************
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
router.get("/api/hiScores/:quizID", (req, res) => {
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

// route for login
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({
    username: req.user.email,
    id: req.user.id,
  });
});

// route for signing up a user
router.post("/api/signup", (req, res) => {
  db.User.create({
    username: req.body.email,
    password: req.body.password,
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch((err) => {
      res.status(401).json(err);
    });
  return;
});

// route for logging user out
router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// route for getting some data about our user to be used client side
router.get("/api/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // otherwise send back the user's email and id
    // sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.email,
      id: req.user.id,
    });
  }
});

module.exports = router;

// // return all quizzes owned by this user
// router.get("/api/user/:UserId", (req, res) => {
//   db.Quiz.findAll({
//     where: {
//       accountID: req.params.UserId,
//     },
//   }).then((results) => {
//     const data = [];
//     results.forEach((result) => {
//       data.push(result.dataValues);
//     });
//     const hbsObj = {
//       quizzes: data,
//     };
//     res.json(hbsObj);
//   });
// });
