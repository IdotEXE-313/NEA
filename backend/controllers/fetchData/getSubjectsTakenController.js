const db = require("../../database/connection");

exports.getSubjectsTaken = async(req, res) => {
    const userID = req.session.userID;
    await db.query("SELECT SubjectName FROM subjectsavailable, subjects, users WHERE subjectsavailable.SubjectID = subjects.SubjectID AND users.UserID = subjects.UserID AND users.UserID = ?", [userID])
        .then((response) => {
            res.send({subjectsTaken: response});
        })
        .catch((err) => {
            console.log(err);
        })
}