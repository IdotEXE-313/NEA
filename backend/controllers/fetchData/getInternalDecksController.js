const db = require("../../database/connection");

exports.getInternalDecks = async(req, res) => {
    const{UserID, SubjectID, SchoolID} = req.body;

    /*
    To Simplify:
    Select the DeckName, DeckID, FolderID and SubjectName 
    for the requested subject id parsed in (this method is called for each of the subjects the user takes)
    and where the deck's user ID is different to their own (avoid seeing their own decks)
    and where the deck's school ID is only equal to the user's school
    */
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