const db = require("../../database/connection");

exports.publicDecks = async(req, res) => {

    const{UserID, SchoolID, SubjectID} = req.body;

    const getPublicDecks = async() => {
        await db.query(`SELECT DeckName, DeckID, FolderID, SubjectName
                        FROM decks, subjectsavailable
                        WHERE decks.SubjectID = ?
                        AND decks.SchoolID <> ?
                        AND decks.visibility = 'Public'
                        AND decks.UserID <> ?
                        AND subjectsavailable.SubjectID = ? `,
                        [SubjectID, SchoolID, UserID, SubjectID ])
            .then((response) => {
                res.send(response);
            })
    }

    await getPublicDecks();
}