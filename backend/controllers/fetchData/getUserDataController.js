const db = require("../../database/connection");

exports.getUserData = async (req, res) => {

    const username = req.body.username;

    await db.query("SELECT EstablishmentName FROM users, schools WHERE users.username = ? AND users.SchoolID = schools.URN ", [username])
        .then((response) => {
            res.send({schoolName: response})
        })
        .catch((err) => {
            console.log(err);
        })
}