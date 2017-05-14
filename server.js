// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const Promise = require("bluebird");

//The scraping tools
const request = require("request");
const cheerio = require("cheerio");

//Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//Initiate Express
const app = express();

// Set the app up with morgan and body-parser
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

//Serve static content for the app from the "public" directory in the application directory
app.use(express.static(__dirname + "/public"));

//Set Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Database configuration
mongoose.connect("mongodb://localhost/mongoosearticles");
const db = mongoose.connection;


// Log any mongoose errors to console
db.on("error", function(error) {
    console.log("Database Error:", error);
});

//Once logged into the DB through mongoose, log a success message
db.once("open", function () {
    console.log("Mongoose connection successful.");
});

//Require Schemas
const Note = require("./models/Note.js");
const Article = require("./models/Article.js");

//Import routes and give the server access to them
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});