// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

// Set the app up with morgan, body-parser, and a static folder
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));

//Database configuration
mongoose.connect("mongodb://localhost/");
const db = mongoose.connection;


// Log any mongojs errors to console
db.on("error", function(error) {
    console.log("Database Error:", error);
});

db.once("open", function () {
    console.log("Mongoose connection successful.");
});

//Require Schemas
const Note = require("./models/Note.js");
const Article = require("./models/Article.js");


// Routes
// ======

// Simple index route
app.get("/", function(req, res) {
    res.send(index.html);
});


// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});