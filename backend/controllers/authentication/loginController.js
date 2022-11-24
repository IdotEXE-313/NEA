const db = require("../../database/connection");

exports.authenticateUser = async(req, res) => {
    const{username, password} = req.body;

    const findUser = await db.query("select username from users where username=? and password=?", [username, password]);
    if(findUser){
        res.send({auth: true});
        req.session.isAuth = true;
        return;
    }
    res.send({auth:false});
}