const db = require("../../database/connection");

exports.getSubjectsTaken = async(req, res) => {
    const userID = req.session.userID;


    await db.query(`SELECT SubjectName, FolderID FROM subjectsavailable, folders, users 
                    WHERE subjectsavailable.SubjectID = folders.SubjectID 
                    AND users.UserID = folders.UserID 
                    AND users.UserID = ?`, [userID])
        .then((response) => {
            res.send({subjectsTaken: response, UserID: userID});
        })
        .catch((err) => {
            console.log(err);
        })
}