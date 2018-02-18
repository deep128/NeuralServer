//index.js

var fs = require("fs");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
console.log("reading config.json...");
fs.readFile("./config.json","UTF-8",(err, data)=>{
    if(err) {
        console.log(err)
    }
    else {
        var config = JSON.parse(data)
        startServer(config)
    }
});

function startServer(config) {
    console.log("starting server...");
    var server = app.listen(config.port,()=>{
        console.log(`Listning on http://${server.address().address}:${server.address().port}`)
    });
}

app.use(express.static("./public"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
    console.log(`${req.method}: ${req.url}   ${JSON.stringify(req.body)}`);
    next();
});

module.exports = app;