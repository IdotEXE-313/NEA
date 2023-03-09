const db = require("../../database/connection");

exports.addSubject = async(req, res) => {
    const subjectName = req.body.subjectName;
    const username = req.body.username;

    const getSubjectID = async() => {
        await db.query("SELECT UserID, SubjectID FROM subjectsavailable, users WHERE SubjectName=(?) AND users.username = ?", [subjectName, username])
            .then((response) => {
                checkForDuplicateEntry(response[0][0].SubjectID, response[0][0].UserID);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const checkForDuplicateEntry = async(SubjectID, UserID) => {
        await db.query(`SELECT FolderID FROM Folders
                        WHERE Folders.SubjectID = ?
                        AND Folders.UserID = ?`,
                        [SubjectID, UserID])
            .then((response) => {
                
                if(typeof(response[0][0]) !=  "undefined"){
                    res.send({dataInserted: false});
                }
                else{
                    addSubject(SubjectID);
                }
            })
    }

    const addSubject = async (subjectID) => {
        await db.query("INSERT INTO Folders (FolderID, UserID, SubjectID) VALUES (?, ?, ?)", [Date.now() + Math.random() ,req.session.userID, subjectID])
            .then(() => {
                res.send({dataInserted: true})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    await getSubjectID();
}