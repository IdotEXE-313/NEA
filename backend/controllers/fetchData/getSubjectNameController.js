const db = require("../../database/connection");

exports.getSubjectName = async(req, res) => {
    const SubjectID = req.body.SubjectID;

    const getSubjectName = async() => {
        await db.query("SELECT SubjectName FROM subjectsavailable WHERE SubjectID = ?", [SubjectID])
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    await getSubjectName();
}