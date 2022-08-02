const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(process.env.LINK, {
  useNewUrlParser: true
});

const querySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});



const Message = mongoose.model("Message", querySchema);


app.get("/", function(req, res) {
  res.render("index");
})

app.get("/query", function(req, res) {
  res.render("query");
})

app.post("/query", function(req, res) {
  const query1 = new Message({
    email: req.body.email,
    message: req.body.name
  });
  query1.save();
  res.redirect("/");
});



app.listen(process.env.PORT || "3000", function() {
  console.log("server is running on port 3000");
});
