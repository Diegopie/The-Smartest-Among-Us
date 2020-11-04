const opentdb = require("opentdb-api");

const test = {
  amount: 10,
  category: "art",
  difficulty: "medium",
  type: "multiple",
};

opentdb.getTrivia(test).then((result) => {
  console.log(result);
});
