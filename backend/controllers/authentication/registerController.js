const db = require("../../database/connection");

module.registerUser = async(req, res) => {
    const {username, password} = req.body;

    try{
        await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
        res.sendStatus(200); //200 symbolising OK request. This won't be triggered if the database request fails, so 200 should suffice
    } catch(err){
        switch(err){
            case("ER_DUP_ENTRY"): //Catches the error if the username already exists in the database
                res.send(`${username} is already in use!`);
                break;
        }
    }

}