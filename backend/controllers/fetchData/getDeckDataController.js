const db = require("../../database/connection");

exports.getDeckData = async(req, res) => {

    const deckID = req.body.deckID;
    
    await db.query("SELECT DeckName, UserID  FROM decks WHERE DeckID = ?", [deckID])
        .then((response) => {
            res.send({data: response});
        })
        .catch((error) => {
            res.send({err: error});
        })
}