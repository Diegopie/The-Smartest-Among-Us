// dependencies
const axios = require("axios");
const methods = require("./methods.js");

// parameters
exports.getTrivia = async function (options = {}) {
  amount = options.amount !== undefined ? options.amount : 10;
  difficulty = options.difficulty !== undefined ? options.difficulty : "medium";
  category = options.category !== undefined ? options.category : "any";
  type = options.type !== undefined ? options.type : "multiple";

  // using methods to fill in parameters
  return new Promise(async (resolve, reject) => {
    try {
      const maxCategories = await axios.get(
        "https://opentdb.com/api_category.php"
      );
      const cateID = methods.getTriviaCategoryID(
        category,
        maxCategories.data.trivia_categories[
          maxCategories.data.trivia_categories.length - 1
        ].id
      );
      const pamount = methods.getTriviaAmount(amount);
      const ptype = methods.getTriviaType(type);
      const pdifficulty = methods.getTriviaDifficulty(difficulty);

      const finalParams = {
        amount: pamount,
      };

      if (cateID !== "") {
        finalParams.category = cateID;
      }
      if (pdifficulty !== "") {
        finalParams.difficulty = pdifficulty;
      }
      if (ptype !== "") {
        finalParams.type = ptype;
      }

      const result = await axios.get("https://opentdb.com/api.php", {
        params: finalParams,
      });

      if (result.data.response_code !== 0) {
        reject(
          new Error(
            "Response code " +
              result.data.response_code +
              ": " +
              methods.getResponseError(result.data.response_code)
          )
        );
      } else {
        filteredResult = JSON.parse(
          JSON.stringify(result.data.results)
            .replace(/&quot;/g, "\\'")
            .replace(/&#039;/g, "'")
            .replace(/&amp;/g, "&")
            .replace(/&acute;/g, "`")
            .replace(/&eacute;/g, "é")
            .replace(/&oacute;/g, "ó")
            .replace(/&pound;/g, "£")
            .replace(/&aacute;/g, "á")
            .replace(/&Aacute;/g, "Á")
            .replace(/&ntilde;/g, "ñ")
            .replace(/&rdquo;/g, "\\'")
            .replace(/&ouml;/g, "ö")
        );
        resolve(filteredResult);
      }
    } catch (err) {
      reject(err);
    }
  });
};

exports.getCategories = async function () {
  const results = await axios.get("https://opentdb.com/api_category.php");

  return results.data.trivia_categories;
};

exports.getQuestionCount = function (category) {
  return new Promise(async (resolve, reject) => {
    try {
      const maxCategories = await axios.get(
        "https://opentdb.com/api_category.php"
      );
      const cateID = methods.getTriviaCategoryID(
        category,
        maxCategories.data.trivia_categories[
          maxCategories.data.trivia_categories.length - 1
        ].id
      );
      const questionCount = await axios.get(
        `https://opentdb.com/api_count.php?category=${cateID}`
      );

      resolve(questionCount.data.category_question_count);
    } catch (err) {
      reject(err);
    }
  });
};
