// Routes
// =============================================================
module.exports = function(app) {
    // Simple index route
    app.get("/", function(req, res) {
        res.render("index");
    });
};