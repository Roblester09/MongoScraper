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
            $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "</p>");
            $("#articles").append("<a data-id='" + data[i]._id + "' href='"   + data[i].link + "' target='about_blank'>" + data[i].link + "</a>");
            console.log('\n\nappending articles to page');
        }
    });
}

scrapeArticles();