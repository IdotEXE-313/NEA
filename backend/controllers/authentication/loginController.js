const db = require("../../database/connection");
const bcrypt = require("bcrypt");

exports.authenticateUser = async(req, res) => {
    const{username, password} = req.body;

    const getHashedPassword = async() => {
        await db.query(`SELECT UserID, password FROM users
                        WHERE username=?`,
                        [username])
            .then((response) => {
                login(response[0][0].password, response[0][0].UserID);
            })
            .catch((err) => {
                console.log(err);
                res.send({err: true});
            })
    }


    const login = async(hashedPassword, userID) => {

        bcrypt.compare(password, hashedPassword, ((err, result) => {
            if(result){
                req.session.isAuth = true;
                req.session.userID = userID;
                res.send({isLoggedIn: true, username: username});
            }
            else{
                res.send({isLoggedIn: false});
            }
        }))
    }

    await getHashedPassword();

    // await db.query("select * from users where username=? and password=?", [username, password])
    //     .then((response) => {
    //         try {
    //             if(response[0][0].Username === username && response[0][0].Password === password){
    //                 req.session.isAuth = true;
    //                 req.session.userID = response[0][0].UserID;
    //                 res.send({isLoggedIn: true, username: username});
    //             }
    //             else{
    //                 res.send({isLoggedIn: false});
    //             }
    //         }
    //         catch{
    //             res.send({isLoggedIn: false});
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
}