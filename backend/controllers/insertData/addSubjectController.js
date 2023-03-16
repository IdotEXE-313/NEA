const db = require("../../database/connection");

exports.addSubject = async(req, res) => {
    const subjectName = req.body.subjectName;
    const username = req.body.username;


    const getSubjectID = async() => {
        //need the subject id before inserting a subject
        await db.query("SELECT UserID, SubjectID FROM subjectsavailable, users WHERE SubjectName=(?) AND users.username = ?", [subjectName, username])
            .then((response) => {
                checkForDuplicateEntry(response[0][0].SubjectID, response[0][0].UserID); //method that fixed issue of user adding the same subject twice (or more)
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
                
                //if there is a valid response, then the user already takes the subject they are trying to insert.
                if(typeof(response[0][0]) !=  "undefined"){
                    res.send({dataInserted: false});
                }
                else{
                    addSubject(SubjectID); //else, they don't take the subject, so insert it
                }
            })
    }

    const addSubject = async (subjectID) => {
        const folderID = Math.floor(Date.now() + Math.random());
        //query for inserting a new subject folder
        await db.query("INSERT INTO Folders (FolderID, UserID, SubjectID) VALUES (?, ?, ?)", [folderID ,req.session.userID, subjectID])
            .then(() => {
                res.send({dataInserted: true})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    await getSubjectID(); //this method calls all methods written (or at least leads to it)
}