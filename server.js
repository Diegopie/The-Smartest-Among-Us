const express = require("express");
// const exphbs = require("express-handlebars");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const db = require("./models");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server listening on: " + PORT);
  });
});
