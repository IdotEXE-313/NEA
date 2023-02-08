const db = require("../../database/connection");

exports.addCard = async (req, res) => {
    const {cardFront, cardBack, deckID} = req.body;
    const efactor = 2.5; //this is the default efactor for new cards
    const cardID = Math.floor(Date.now() + Math.random());

    await db.query("INSERT INTO card (cardID, deckID, CardFront, CardBack, efactor) VALUES (?, ?, ?, ?, ?)", 
        [cardID, deckID, cardFront, cardBack, efactor])
        .then((response) => {
            res.send({success: "Card Added"})
        })
        .catch((err) => {
            res.send({err: "Try Again Later"})
        });
}