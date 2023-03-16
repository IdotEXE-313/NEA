const db = require("../../database/connection");

exports.getSchools = async(req, res) => {

    //This method is called every time a change is detected in the 'School Name' form on the register page
    //Hence, we return schools that are like the text being typed such that suggested schools can appear in real time
    await db.query(`SELECT * FROM schools WHERE EstablishmentName LIKE '${req.body.schoolName}%'`)
        .then((data) => {
            res.send({schools: data});
        }).catch((error) => {
            console.log(error);
        })
        
}