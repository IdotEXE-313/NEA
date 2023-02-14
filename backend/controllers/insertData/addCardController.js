const db = require("../../database/connection");
const dateObject = new Date();

exports.addCard = async (req, res) => {
    const {cardFront, cardBack, deckID} = req.body;
    const efactor = 2.5; //this is the default efactor for new cards
    const date = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
    const cardID = Math.floor(Date.now() + Math.random());

    await db.query("INSERT INTO card (cardID, deckID, CardFront, CardBack, NextReviewDate, Priority, intervalNum, repitition, efactor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [cardID, deckID, cardFront, cardBack, date, 0, 0, 0, efactor])
        .then((response) => {
            res.send({success: "Card Added"})
        })
        .catch((err) => {
            console.log(err);
            res.send({err: "Try Again Later"})
        });
}