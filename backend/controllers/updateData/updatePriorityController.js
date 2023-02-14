const db = require("../../database/connection");

exports.updatePriority = async(req, res) => {
    const {priority, deckID, cardID} = req.body;

    await db.query("UPDATE card SET Priority = ? WHERE card.CardID = ? AND card.DeckID = ? ", [priority, cardID, deckID])
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })

}