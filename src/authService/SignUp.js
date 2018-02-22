// Module

module.exports = function(moduleArg) {
    moduleArg.app.post('/api/signup',function(req, res) {

        const sql = `Insert into users (Username, FirstName, LastName, Email, Gender, Password) values ('${req.body.username}', '${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${req.body.gender=='male'?1:0}', '${req.body.password}')`;

        moduleArg.con.query(sql, function (err, result) {
            if (err) 
                console.log(err);
            else {
            res.status(201).send(JSON.stringify({
                    msg: "Inserted",
                    status: "300"
                }));
            }
          });
    });

    moduleArg.app.get('/api/signup/checkusername',function(req,res) {
        const sql = `SELECT id FROM users WHERE Username='${req.query.username}'`;

        moduleArg.con.query(sql, function (err, result) {
            if (err) throw err;
            res.status(200);
            res.end(JSON.stringify({
                msg: "User not found",
                status: "404"
            }));
          });
    });
}