const db = require("../../database/connection");

exports.authenticateUser = async(req, res) => {
    const{username, password} = req.body;

    await db.query("select * from users where username=? and password=?", [username, password])
        .then((response) => {
            if(response[0][0].Username === username && response[0][0].Password === password){
                req.session.isAuth = true;
                res.send({isLoggedIn: true});
            }
        })
        .catch((err) => {
            console.log(err);
        })
}