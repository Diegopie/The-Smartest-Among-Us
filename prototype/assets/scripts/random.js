// * Global Variables

let quizRes = [[
  {
    "category": "Politics",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Whose 2016 presidential campaign slogan was &quot;Make America Great Again&quot;?",
    "correct_answer": "Donald Trump",
    "incorrect_answers": [
      "Ted Cruz",
      "Marco Rubio",
      "Bernie Sanders"
    ]
  },
  {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Who created the pump &quot;F.L.U.D.D.&quot; Mario uses in Super Mario Sunshine?",
    "correct_answer": "Elvin Gadd",
    "incorrect_answers": [
      "Robert Fludd",
      "Nirona",
      "Crygor"
    ]
  },
  {
    "category": "Entertainment: Books",
    "type": "multiple",
    "difficulty": "medium",
    "question": "According to The Hitchhiker&#039;s Guide to the Galaxy book, the answer to life, the universe and everything else is...",
    "correct_answer": "42",
    "incorrect_answers": [
      "Loving everyone around you",
      "Chocolate",
      "Death"
    ]
  },
  {
    "category": "General Knowledge",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What is the name of Poland in Polish?",
    "correct_answer": "Polska",
    "incorrect_answers": [
      "Pupcia",
      "Polszka",
      "P&oacute;land"
    ]
  },
  {
    "category": "Entertainment: Japanese Anime & Manga",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Who is the colossal titan in &quot;Attack On Titan&quot;?",
    "correct_answer": "Bertolt Hoover",
    "incorrect_answers": [
      "Reiner",
      "Eren",
      "Sasha"
    ]
  },
  {
    "category": "Entertainment: Board Games",
    "type": "multiple",
    "difficulty": "hard",
    "question": "Which card is on the cover of the Beta rulebook of &quot;Magic: The Gathering&quot;?",
    "correct_answer": "Bog Wraith",
    "incorrect_answers": [
      "Island",
      "Rock Hydra",
      "Elvish Archers"
    ]
  },
  {
    "category": "Entertainment: Film",
    "type": "multiple",
    "difficulty": "medium",
    "question": "In the Friday The 13th series, what is Jason&#039;s mother&#039;s first name?",
    "correct_answer": "Pamela",
    "incorrect_answers": [
      "Mary",
      "Christine",
      "Angeline"
    ]
  },
  {
    "category": "General Knowledge",
    "type": "multiple",
    "difficulty": "hard",
    "question": "Located in Chile, El Teniente is the world&#039;s largest underground mine for what metal?",
    "correct_answer": "Copper",
    "incorrect_answers": [
      "Iron",
      "Nickel",
      "Silver"
    ]
  },
  {
    "category": "Science: Gadgets",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Out of all of the NASA Space Shuttles, which 2 have been destroyed in disasters?",
    "correct_answer": "Challenger and Columbia",
    "incorrect_answers": [
      "Enterprise and Atlantis",
      "Discovery and Endeavour",
      "None of the Above"
    ]
  },
  {
    "category": "Entertainment: Japanese Anime & Manga",
    "type": "multiple",
    "difficulty": "hard",
    "question": "In the first episode of Yu-Gi-Oh: Duel Monsters, what book is Seto Kaiba seen reading at Domino High School?",
    "correct_answer": "Thus Spoke Zarathustra",
    "incorrect_answers": [
      "Beyond Good and Evil",
      "The Republic",
      "Meditations"
    ]
  }
]];

let parsedQuiz = [];
    console.log(quizRes[0].length);

function parseRes () {
  for (let i = 0; i < quizRes[0].length; i++) {
    // Variables
    let curQ = quizRes[0][i];
    const curA = []
    let correctA;

    // Sort Questions into a Single Array
    curA.push(curQ.correct_answer)
    
    for (let j = 0; j < curQ.incorrect_answers.length; j++) {
      curA.push(curQ.incorrect_answers[j])
    }
        console.log(curA);

    // Randomize the array
    shuffleArray(curA);
        console.log(curA);

    // Check Where Correct Answer is in the Array
    curA.forEach(function(item, v){
      if (item == curQ.correct_answer) {
            console.log(v);
        correctA = v;
        return v
      }
    });

    // Create Parsed Object and Push to parsedQuiz;
    let curObj = {
      question: curQ.question,
      answers: curA,
      correct: correctA,
    };
        
    parsedQuiz.push(curObj)
    console.log(parsedQuiz);
  };
};

parseRes()


/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}