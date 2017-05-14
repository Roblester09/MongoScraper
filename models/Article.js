//Require mongoose
const mongoose = require("mongoose");

//Create Schema Class
const Schema = mongoose.Schema;

//Create article schema
const ArticleSchema = new Schema({

    //title is required
    title: {
        type: String,
        required: true
    },

    //link is required
    link: {
        type: String,
        required: true
    },

    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }

});

//Create the Article model with the ArticleSchema
const Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;