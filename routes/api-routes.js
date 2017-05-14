// Dependencies
// =============================================================

// Requiring the Note and Article models
const Note = require("../models/Note.js");
const Article = require("../models/Article.js");

// Routes
// =============================================================
module.exports = function(app) {
    // A GET request to scrape the starwars website
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with request
        request("http://www.starwars.com/databank", function(error, response, html) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(html);
            // Now, we grab every h2 within an article tag, and do the following:
            $("p.title").each(function(i, element) {

                // Save an empty result object
                const result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this).children("a").text();
                // var result.link = $(element).children().attr("href"); OR
                result.link = $(this).children("a").attr("href");

                // Using our Article model, create a new entry
                // This effectively passes the result object to the entry (and the title and link)
                // save article title and link if it is an article and not a comment
                if (result.link.slice(0,4) == "http") {
                    if (result.title && result.link) {
                        //If a document exists with this title, don't add it to the db
                        Article.find({title: result.title}, function (err, exists) {
                            if (exists.length) {
                                console.log('Article already exists');
                            }
                            else {

                                // Using our Article model, create a new entry, passing the result object to the entry (the title and link)
                                const entry = new Article(result);

                                // Now, save that entry to the db
                                entry.save(function (err, doc) {
                                    // Log any errors
                                    if (err) {
                                        console.log(err);
                                    }
                                    // Or log the doc
                                    else {
                                        console.log(doc);
                                    }
                                });
                            }
                        });
                    }
                }
            });
        });
        // Tell the browser that we finished scraping the text
        res.send("Scrape Complete");
    });

    // This will get the articles we scraped from the mongoDB
    app.get("/articles", function(req, res) {
        // Grab every doc in the Articles array
        Article.find({}, function(error, doc) {
            // Log any errors
            if (error) {
                res.console(error);
                // Or send the doc to the browser as a json object
            } else {
                res.json(doc);
            }
        });
    });
};