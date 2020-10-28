// dependencies
const path = require("path");
// routes
module.exports = function (app) {
  // index
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  // account
  app.get("/account", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/account.html"));
  });
  // play
  app.get("/play", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/play.html"));
  });
  // create
  app.get("/create", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/create.html"));
  });
};
