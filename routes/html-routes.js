// dependencies
const path = require("path");
// routes
module.exports = function (app) {
  // index
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  // account
  app.get("/account", (req, res) => {
    res.sendFile(path.join(__dirname, "account.html"));
  });
  // play
  app.get("/play", (req, res) => {
    res.sendFile(path.join(__dirname, "play.html"));
  });
  // create
  app.get("/create", (req, res) => {
    res.sendFile(path.join(__dirname, "create.html"));
  });
};
