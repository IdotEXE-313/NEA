const db = require("../../database/connection");

exports.getPublicDecks = async (req, res) => {
    const {SchoolID, SubjectID, UserID} = req.body;

    console.log(UserID);

   const getInternalDecks = async () => {
        await db.query(`SELECT folders.FolderID, DeckID, DeckName
                        FROM decks, folders
                        WHERE decks.SchoolID = ?
                        AND decks.visibility = 'Internal'
                        AND decks.UserID <> ?
                        AND folders.SubjectID = ?`,
                        [SchoolID, UserID, SubjectID])
            .then((response) => {
                res.send(response);
            })
   }

   await getInternalDecks();
}