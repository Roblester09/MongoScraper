function scrapeArticles () {
    console.log('in scrapeArticles');
    const data={};
    $.getJSON("/scrape", function(data) {
        console.log('successful scrape');
        console.log('data from scrape', data);
        getArticles();

    });
}

function getArticles () {
    console.log('in getArticles');
    $.getJSON("/articles", function(data) {
        console.log(data);
        // For each one
        for (let i = 0; i < data.length; i++) {
            // Display the information on the page
            const article = $("<div>");
            article.addClass("col-md-6 well well-lg");
            article.attr("data-toggle", "modal");
            article.attr("data-target", "#myModal");
            article.append("<p data-id='" + data[i]._id + "'>" + data[i].title + "</p>");
            article.append("<a data-id='" + data[i]._id + "' href='"   + data[i].link + "' target='about_blank'>" + data[i].link + "</a>");
            console.log('\n\nappending articles to page');
            $("#main").append(article);
        }
    });
}

scrapeArticles();

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#note-title").empty();
    $("#note-body").empty();
    // Save the id from the p tag
    const thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    // With that done, add the note information to the page
        .done(function(data) {
            console.log(data);
            // The title of the article
            $("#note-title").append("<p class='title'>" + data.title + "</p>");
            // An input to enter a new title
            //$("#notes").append("<input id='titleinput'  name='title' >");
            // A textarea to add a new note body
            $("#note-body").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                //$("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});