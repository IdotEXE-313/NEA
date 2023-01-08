const db = require("../../database/connection");

exports.addCard = async (req, res) => {
    const {cardFront, cardBack, deckID} = req.body;
    const cardID = Math.floor(Date.now() + Math.random());

    await db.query("INSERT INTO card (cardID, deckID, CardFront, CardBack) VALUES (?, ?, ?, ?)", 
        [cardID, deckID, cardFront, cardBack])
        .then((res) => {
            res.send({success: "Card Added"})
        })
        .catch((err) => {
            res.send({err: "Try Again Later"})
        });
}