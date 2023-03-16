const db = require("../../database/connection");

//need deckId generated and schoolid
exports.addDeck = async (req, res) => {
    const{deckName, folderID, visibility, deckID, username} = req.body;

    const getSchoolAndUserID = async () => {
        //need query to get school and user id since these are essential fields that cannot be obtained from the post request's body
        await db.query("SELECT SchoolID, folders.SubjectID, users.UserID FROM users, folders WHERE users.username = ? AND folders.FolderID = ? AND folders.UserID = users.UserID", [username, folderID])
            .then((response) => {
                insertData(response[0][0]); //if there is a response, run insertData with the school and user id
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const insertData = async (response) => {

        const {UserID, SchoolID, SubjectID} = response;

        //query for inserting a new deck
        await db.query(`INSERT INTO decks (DeckID, DeckName, FolderID, SchoolID, Visibility, UserID, SubjectID) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
        [deckID, deckName, folderID, SchoolID, visibility, UserID, SubjectID])
        .then(() => {
            res.send({inserted: true});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    if((deckName.length > 0)){ //Ensures the deck name cannot be blank. Anything from a single character upwards is valid.
        await getSchoolAndUserID();
    }
    else{
        res.send({inserted: false});
    }

}