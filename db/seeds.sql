USE quizApp;

-- account for built-in quizzes
INSERT INTO Users (username, "password")
VALUES ("admin", "impstr");

-- Among Us quiz
INSERT INTO Quizzes(quizName, randomize, accountID)
VALUES ("Among Us", true, 1);

INSERT INTO Questions (quizID, quesionNum, question, correctAnswer, wrongAnswer, wrongAnswer2, wrongAnswer3)
VALUES (1, 1, "", "", "", "", ""),
(1, 2, "", "", "", "", ""),
(1, 3, "", "", "", "", ""),
(1, 4, "", "", "", "", ""),
(1, 5, "", "", "", "", ""),
(1, 6, "", "", "", "", ""),
(1, 7, "", "", "", "", ""),
(1, 8, "", "", "", "", ""),
(1, 9, "", "", "", "", ""),
(1, 10, "", "", "", "", "");

-- Hollow Knight quiz
INSERT INTO Quiz (quizName, randomize, accountID)
VALUES ("Hollow Knight", true, 1);

INSERT INTO Question (quizID, quesionNum, question, correctAnswer, wrongAnswer, wrongAnswer2, wrongAnswer3)
VALUES (2, 1, "How many nailmasters are there?", "3", "2", "1", "4"),
(2, 2, "To which Dreamer was Quirrel apprenticed?", "Monomon", "Lurien", "Herrah"),
(2, 3, "Who is the daughter of the Pale King and Herrah the Beast?", "Hornet", "Tiso", "Quirrel", "Zote the Mighty"),
(2, 4, "How many opportunities do you have to let Zote die?", "2", "4", "1", "0"),
(2, 5, "What is the Pure Completion achievement for?", "Achieve 112% completion", "ascending the Pantheon of Hallownest", "Aiding the Herald in moving on", "collecting 2400 Essence and hearing the Seer's final words"),
(2, 6, "Which NPC is associated with two conflicting achievements?", "Zote", "Hornet", "Quirrel", "Cloth"),
(2, 7, "What is the final boss of the game?", "Absolute Radiance", "The Godseeker (Pale King)", "Pure Vessel", "Nightmare King Grimm"),
(2, 8, "Which additional content pack was released last?", "Godmaster", "Hidden Dreams", "The Grimm Troupe", "Lifeblood"),
(2, 9, "Which NPC from the original is the main character in the sequel Silksong?", "Hornet", "Zote the Mighty", "Quirrel", "The Hollow Knight"),
(2, 10, "Who is Hornet's half-sibling?", "The Knight", "Zote the Mighty", "The Hollow Knight", "Quirrel");