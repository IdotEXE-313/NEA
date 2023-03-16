const db = require("../../database/connection");

exports.updatePriority = async(req, res) => {
    const {priority, deckID, cardID} = req.body;


    //query for updating the card priority (called when a new priority is selected)
    await db.query("UPDATE card SET Priority = ? WHERE card.CardID = ? AND card.DeckID = ? ", [priority, cardID, deckID])
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })

}