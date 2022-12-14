const db = require("../../database/connection");

exports.addSubject = async(req, res) => {
    const subjectName = req.body.subjectName;

    const getSubjectID = async() => {
        await db.query("SELECT SubjectID FROM subjectsavailable WHERE SubjectName=(?)", [subjectName])
            .then((response) => {
                addSubject(response[0][0].SubjectID);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const addSubject = async (subjectID) => {
        await db.query("INSERT INTO Subjects (SubjectID, UserID) VALUES (?, ?)", [subjectID, req.session.userID])
            .catch((err) => {
                console.log(err);
            })
    }

    await getSubjectID();
}