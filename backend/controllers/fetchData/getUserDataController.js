const db = require("../../database/connection");

exports.getUserData = async (req, res) => {

    const username = req.body.username;

    if(req.session.isAuth){
        const getUserID = async () => {
            let userID = await db.query("SELECT UserID FROM users WHERE username=?", [username]);
            return userID;
        }
    
        const getSchool = async() => {
            let userIDRes = await getUserID();
            let userID = userIDRes[0][0].UserID;
            await db.query("SELECT EstablishmentName, URN FROM users, schools WHERE users.UserID = ? AND users.SchoolID = schools.URN",[userID])
                .then(async(response) => {
                    let {EstablishmentName, URN} = response[0][0];
                    await getSubjectsTaken(EstablishmentName, URN);
                })
        }
    
        const getSubjectsTaken = async(school, URN) => {
            let userIDRes = await getUserID();
            let userID = userIDRes[0][0].UserID;
            await db.query(`SELECT SubjectName, folders.SubjectID FROM subjectsavailable, folders
                            WHERE folders.UserID = ? AND subjectsavailable.SubjectID = folders.SubjectID`, [userID])
                    .then((response) => {
                        let subjects = response[0];
                        res.send({
                            schoolInfo: {
                                schoolName: school,
                                schoolID: URN
                            },
                            subjects: subjects,
                            UserID: userID
                        });
                    })
        }
    
        await getSchool();
    }
}