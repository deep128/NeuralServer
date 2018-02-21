//index.js

var fs = require("fs");
var path = require ("path");
var mysql = require("mysql");

console.log("Reading config...");
var config = JSON.parse(fs.readFileSync("./config.json","UTF-8"));

var app = require("./src/Server/server")(config);


var components = {
    modulesPath: []
};

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'neural'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
  });

var moduleArg = {
    app: app,
    con: con,
    config: config
}


console.log("Reading source...");
components.modulesPath = getAllFlilsPath("./src");

components.modulesPath.forEach(function(modulePath) {
    require(modulePath)(moduleArg);
});

function getAllFlilsPath(dir) {
    var filesList = [];
    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
        var inPath = dir + "/" + file;
        var stat = fs.statSync(inPath);
        if(stat && stat.isDirectory()) {
            filesList = filesList.concat(getAllFlilsPath(inPath));
        }
        else if(stat) {
            var content = fs.readFileSync(inPath);
            pattern = /\w*[/][/]\s*module/i;
            var match = pattern.exec(content);
            if(match) {
                filesList.push(inPath);
            }
        }
    });
    return filesList;
}