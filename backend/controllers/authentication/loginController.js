const db = require("../../database/connection");

exports.authenticateUser = async(req, res) => {
    const{username, password} = req.body;

    const findUser = await db.query("select username from users where username=? and password=?", [username, password]);
    if(findUser){
        console.log(req.session);
        req.session.isAuth = true;
        res.send({auth: true});
        return;
    }
    res.send({auth:false});
}