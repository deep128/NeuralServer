//index.js

var fs = require("fs");
var path = require ("path");
var app = require("./src/Server/server");

var components = {
    modulesPath: []
};
console.log("Reading source...");
components.modulesPath = getAllFlilsPath("./src");

components.modulesPath.forEach(function(modulePath) {
    require(modulePath)(app);
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