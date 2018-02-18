//index.js

var app = require("./src/Server/server");

var components = {
    modulesPath: [
        "./src/authService/login"
    ]
};

components.modulesPath.forEach(function(modulePath) {
    require(modulePath)(app);
});