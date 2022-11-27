const db = require("../../database/connection");

exports.getSchools = async(req, res) => {

    await db.query(`SELECT * FROM schools WHERE EstablishmentName LIKE '${req.body.schoolName}%'`)
        .then((data) => {
            res.send({schools: data});
        }).catch((error) => {
            console.log(error);
        })
        
}