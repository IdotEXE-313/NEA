const db = require("../../database/connection");
const bcrypt = require("bcrypt");

exports.authenticateUser = async(req, res) => {
    const{username, password} = req.body;

    //get the hashed password, and then proceed to login method with the password and user id
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

        //compare the hashed password to the plaintext password parsed in
        bcrypt.compare(password, hashedPassword, ((err, result) => {
            if(result){
                //if the credentials are valid, add isAuth and user ID to session cookie
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

}