const db = require("../../database/connection");

exports.getDecks = async (req, res) => {

    const folderID = req.body.folderID;
    
    await db.query("SELECT DeckID, DeckName FROM decks WHERE decks.folderID = ?", [folderID])
        .then((data) => {
            res.send({deckData: data});
        })
        .catch((error) => {
            console.log(error);
        })
}