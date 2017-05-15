// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require('path');


//Initiate Express
const app = express();

// Set the app up with morgan and body-parser
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

//Serve static content for the app from the "public" directory in the application directory
app.use(express.static(process.cwd() + "/public"));

//Set Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//Import routes and give the server access to them
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});