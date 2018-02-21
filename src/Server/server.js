
module.exports = function(config) {
    var express = require("express");
    var cors = require("cors");
    var bodyParser = require("body-parser");

    var app = express();

    console.log("starting server...");
    var server = app.listen(config.port,()=>{
        console.log(`Listning on http://${server.address().address}:${server.address().port}`)
    });

    app.use(express.static("./public"));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(function(req, res, next) {
        console.log(`${req.method}: ${req.url}   ${JSON.stringify(req.body)}`);
        next();
    });

    return app;
}