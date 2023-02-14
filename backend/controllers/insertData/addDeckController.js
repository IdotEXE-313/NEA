const db = require("../../database/connection");

//need deckId generated and schoolid
exports.addDeck = async (req, res) => {
    const{deckName, folderID, visibility, deckID} = req.body;

    const getSchoolID = async () => {
        await db.query("SELECT SchoolID FROM users, folders WHERE folders.FolderID = ? AND folders.UserID = users.UserID", [folderID])
            .then((response) => {
                insertData(response[0][0].SchoolID);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const insertData = async (schoolID) => {

        await db.query(`INSERT INTO decks (DeckID, DeckName, FolderID, SchoolID, Visibility) VALUES (?, ?, ?, ?, ?)`, 
        [deckID, deckName, folderID, schoolID, visibility]);
    }

    await getSchoolID();

}