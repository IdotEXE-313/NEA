const db = require("../../database/connection");

exports.getSchools = async(req, res) => {
    const school = req.body.schoolName;

    const response = await db.query("SELECT * FROM schools WHERE EstablishmentName=?", [school]);
    if(response){
        res.send(response.data);
        return;
    }
    res.send({error: "Cannot find any matches"});
}