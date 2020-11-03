const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controller/routes");

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(routes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server listening on: " + PORT);
  });
});
