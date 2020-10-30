exports.getTriviaCategoryID = function (category, maxCategory) {
  if (parseInt(category) >= 9 && parseInt(category) <= maxCategory) {
    return category;
  }

  // categories
  switch (category) {
    case "any":
      return "";
    case "general":
      return 9;
    case "books":
      return 10;
    case "film":
      return 11;
    case "music":
      return 12;
    case "theatre":
      return 13;
    case "television":
      return 14;
    case "videogames":
      return 15;
    case "boardgames":
      return 16;
    case "science":
      return 17;
    case "computers":
      return 18;
    case "mathematics":
      return 19;
    case "math":
      return 19;
    case "mythology":
      return 20;
    case "sports":
      return 21;
    case "geography":
      return 22;
    case "history":
      return 23;
    case "politics":
      return 24;
    case "art":
      return 25;
    case "celebrities":
      return 26;
    case "animals":
      return 27;
    case "vehicles":
      return 28;
    case "comics":
      return 29;
    case "gadgets":
      return 30;
    case "anime":
      return 31;
    case "cartoons":
      return 32;

    default:
      throw new Error("Cannot find specified category");
  }
};

// multiple choice questions
exports.getTriviaType = function () {
  return "multiple";
};

// difficulty
exports.getTriviaDifficulty = function (difficulty) {
  switch (difficulty) {
    case "any":
      return "";
    case "easy":
      return "easy";
    case "medium":
      return "medium";
    case "hard":
      return "hard";

    default:
      throw new Error(
        difficulty +
          " is not a valid difficulty. Difficulty must either be easy, medium, or hard"
      );
  }
};

// amount of questions
exports.getTriviaAmount = function (amount) {
  amount = 10;
  return amount;
};

exports.getTriviaResponseError = function (code) {
  switch (code) {
    case 1:
      return "The API doesn't have enough questions for your query.";
    case 2:
      return "Invalid parameter(s). Arguments passed aren't valid.";
    default:
      return "An error has occurred in the API";
  }
};
