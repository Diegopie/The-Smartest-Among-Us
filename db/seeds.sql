USE quizApp;

INSERT INTO Account (username, adminKey)
VALUES ("imposter", "123456");

INSERT INTO Quiz (quizName, randomize, accountID)
VALUES ("first Quiz", true, 1);

INSERT INTO Question (quizID, question, correctAnswer, wrongAnswer, wrongAnswer2, wrongAnswer3)
VALUES (1, "question 1", "a correct answer", "wrong", "nope", "guess again")
(1, "q2", "ca", "w1", "w2", "w3")
(1, "Q3", "i'm right", "wrong", "boop", "nope")
(1, "q4", "yis", "nah", "ew", "bye")
(1, "q5", "shantay you stay", "sashay", "away", "*side-eye*")
(1, "6", "yup", "no", "no", "no")
(1, "7", "t", "f", "f", "f")
(1, "8", "1", "0", "0", "0")
(1, "9", "p", "f", "f", "f")
(1, "10", "true", "true", "true", "true");

INSERT INTO Score (username, score, quizID)
VALUES ("imposter", 10, 1)
("second place", 9, 1)
("second second", 9, 1)
("fourth", 8, 1)
("fifth", 7, 1)
("fifthy", 7, 1)
("six", 6, 1)
("sev", 4, 1)
("ayt", 3, 1)
("noine", 2, 1);