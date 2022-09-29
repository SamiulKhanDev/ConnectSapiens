require("dotenv").config();
require("./database").db();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
const port = process.env.PORT || 3001;
app.use("/", require("./routes"));

app.listen(port, () => {
  console.log("Server is up");
});

//As this is backend code running on Node,we will use require and module.exports.While
//at frontend we will use es6 import export syntax.
