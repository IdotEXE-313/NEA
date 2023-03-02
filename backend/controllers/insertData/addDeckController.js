const db = require("../../database/connection");

//need deckId generated and schoolid
exports.addDeck = async (req, res) => {
    const{deckName, folderID, visibility, deckID, username} = req.body;

    const getSchoolAndUserID = async () => {
        await db.query("SELECT SchoolID, users.UserID FROM users, folders WHERE users.username = ? AND folders.FolderID = ? AND folders.UserID = users.UserID", [username,folderID])
            .then((response) => {
                insertData(response[0][0]);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const insertData = async (response) => {

        const {UserID, SchoolID} = response;

        await db.query(`INSERT INTO decks (DeckID, DeckName, FolderID, SchoolID, Visibility, UserID) VALUES (?, ?, ?, ?, ?, ?)`, 
        [deckID, deckName, folderID, SchoolID, visibility, UserID]);
    }

    await getSchoolAndUserID();

}