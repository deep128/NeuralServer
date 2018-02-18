var jwt = require("jsonwebtoken");

module.exports = function(app) {
    app.get("/authservice", function(req, res) {
        res.json("done");
    })
}