const db = require("../../database/connection");

exports.getSubjects = async (req, res) => {
    await db.query("SELECT SubjectID, SubjectName FROM subjectsavailable")
        .then((response) => {
            res.send({subjectData: response});
        })
        .catch((err) => {
            res.send({error: "Cannot fetch subjects. Try again later"});
        })
    
}