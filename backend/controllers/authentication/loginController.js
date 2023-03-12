const db = require("../../database/connection");

exports.authenticateUser = async(req, res) => {
    const{username, password} = req.body;

    await db.query("select * from users where username=? and password=?", [username, password])
        .then((response) => {
            try {
                if(response[0][0].Username === username && response[0][0].Password === password){
                    req.session.isAuth = true;
                    req.session.userID = response[0][0].UserID;
                    res.send({isLoggedIn: true, username: username});
                }
                else{
                    res.send({isLoggedIn: false});
                }
            }
            catch{
                res.send({isLoggedIn: false});
            }
        })
        .catch((err) => {
            console.log(err);
        })
}