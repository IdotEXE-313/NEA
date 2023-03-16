const db = require("../../database/connection");
const bcrypt = require("bcrypt");

exports.registerUser = async(req, res) => {
    const {username, password, school} = req.body;

    //hash the plaintext password with 12 salt rounds
    bcrypt.hash(password, 12, (async(err, hash) => {
        if(err){
            console.log(err);
            res.send({err: true});
        }
        else{
            await insertUser(hash);
        }
    }));

    
    const insertUser = async(hashedPassword) => {
        await db.query("INSERT INTO users (username, password, schoolid) values(?, ?, ?)", [username, hashedPassword, school || null]) //insert the school name or null if the school is not given
            .then(() => {
                res.send({isRegistered: true});
            })
            .catch((err) => {
                console.log(err);
            })
    }

    await insertUser();
}
