
 // module

var jwt = require("jsonwebtoken");

module.exports = function(moduleArg) {
    moduleArg.app.get("/api/authservice", function(req, res) {
        if(!req.headers.authorization) {
            throw "Unauthorized!";
        }
        var pattern = /^Basic /;
        var match = pattern.exec(req.headers.authorization);
        if(match) {
            var auth = Buffer.from(req.headers.authorization.replace(pattern,""),'base64').toString().split(":");
        }
        else {
            throw "Unauthorized!";
        } 

        var userAuth = {
            username : auth[0],
            password : auth[1]
        }

        const payload = {
            username: userAuth.username
        }

        var token = jwt.sign(payload, moduleArg.config.secret, {
            expiresIn: 1440
        });
        res.status(200);
        res.end(token);
    });

    moduleArg.app.get("/api/authservice/:token", function(req, res) {
        res.status(202);
        res.end("");
    });
}