// dependencies
const path = require("path");

// routes
module.exports = function (app) {

  // index
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // account
  app.get("/account", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/account.html"));
  });

  // play
  app.get("/play", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/play.html"));
  });

  // create
  app.get("/create", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/create.html"));
  });

};
