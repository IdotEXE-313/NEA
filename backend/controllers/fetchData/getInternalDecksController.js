const db = require("../../database/connection");

exports.getInternalDecks = async(req, res) => {
    const{UserID, SubjectID, SchoolID} = req.body;

    const getInternalDecks = async() => {
        await db.query(`SELECT DeckName, DeckID, FolderID, SubjectName
                        FROM decks, subjectsavailable
                        WHERE decks.SubjectID = ?
                        AND decks.UserID <> ?
                        AND decks.SchoolID = ?
                        AND decks.visibility = 'Internal'
                        AND subjectsavailable.SubjectID = ?`,
                        [SubjectID,UserID, SchoolID, SubjectID])
            .then((response) => {
                res.send(response);
            })
    }
    await getInternalDecks();
}