// Module

module.exports = function(moduleArg) {
    moduleArg.app.post('/api/signup',function(req, res) {
        
        // const sql = `INSERT INTO users Username='${req.query.username}'`;

        // moduleArg.con.query(sql, function (err, result) {
        //     if (err) throw err;
        //     res.status(200);
        //     res.end(JSON.stringify({
        //         msg: "User not found",
        //         status: "404"
        //     }));
        //   });
        // res.end("");
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