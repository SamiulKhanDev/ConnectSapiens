require("dotenv").config(); //to config dotenv,only in main entry point
require("./database").db(); //connecting with mongodb database
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser"); //required for express to understand json req body
const app = express();
const corsObj = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsObj));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
const port = process.env.PORT || 3001;
app.use("/", require("./routes")); //all the routes are maitained in diffrenet folder

app.listen(port, () => {
  console.log(`Server is up http://localhost:${port}`);
});

//As this is backend code running on Node,we will use require and module.exports.While
//at frontend we will use es6 import export syntax.
