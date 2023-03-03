const db = require("../../database/connection");

exports.getCardData = async(req, res) => {

    const deckID = req.body.deckID;

    const getCardData = async() => {
        await db.query(`SELECT CardID, CardFront, CardBack, NextReviewDate, Priority
                        FROM card
                        WHERE card.DeckID = ?`, [deckID])
            .then((response) => {
                res.send(response);
            })
    }

    await getCardData();
}