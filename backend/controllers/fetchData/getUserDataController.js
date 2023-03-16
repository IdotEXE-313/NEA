const db = require("../../database/connection");

exports.getUserData = async (req, res) => {

    const username = req.body.username;


    if(req.session.isAuth){ //resolves issue of running at the point of logging out (home page refreshes which remounts the component)
        const getUserID = async () => {
            let userID = await db.query("SELECT UserID FROM users WHERE username=?", [username]);
            return userID;
        }
    
        //need the user id to get the user's school, but cannot access it without calling a separate method. Hence, these are two different methods
        const getSchool = async() => {
            let userIDRes = await getUserID();
            let userID = userIDRes[0][0].UserID;

            //query for selecting the school the user attends (if provided)
            await db.query("SELECT EstablishmentName, URN FROM users, schools WHERE users.UserID = ? AND users.SchoolID = schools.URN",[userID])
                .then(async(response) => {
                    if(response[0][0]){
                        let {EstablishmentName, URN} = response[0][0]; //if there is a response, run getSubjectsTaken with arguments parsed
                        await getSubjectsTaken(EstablishmentName, URN, userID);
                    }
                    else{
                        await getSubjectsTaken(null, null, userID); //if no valid response, run the method anyway (since this returns values that we'd need regardless of whether the user had selected a subject)
                    }
                })
        }
    

        const getSubjectsTaken = async(school, URN, userID) => {  

            //query for selecting subjects taken
            await db.query(`SELECT SubjectName, folders.SubjectID FROM subjectsavailable, folders
                            WHERE folders.UserID = ? AND subjectsavailable.SubjectID = folders.SubjectID`, [userID])
                    .then((response) => {
                        let subjects = response[0]; //sending subjects taken as one object since the frontend deals with iterating over all subjects taken
                        res.send({
                            schoolInfo: {
                                schoolName: school,
                                schoolID: URN
                            },
                            subjects: subjects,
                            UserID: userID
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.send({err: true});
                    })
        }
    
        await getSchool(); //this method runs all methods written here
    }
}