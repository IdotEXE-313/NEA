const db = require("../../database/connection");
const dateObject = new Date();

//For clarity over default values (minus priority, since this is not related to the supermemo algorithm), see https://super-memory.com/english/ol/sm2.htm

exports.addCard = async (req, res) => {
    const {cardFront, cardBack, deckID} = req.body;
    const efactor = 2.5; //this is the default efactor for new cards
    const date = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate()); //generates the current date in the format YYY/MM/DD
    const cardID = Math.floor(Date.now() + Math.random());

    //query for inserting a new card
    await db.query("INSERT INTO card (cardID, deckID, CardFront, CardBack, NextReviewDate, Priority, intervalNum, repitition, efactor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [cardID, deckID, cardFront, cardBack, date, 0, 0, 0, efactor]) //the three zeros are for Priority, interval and repetition. Priority because the priority of an unreviewed card should be 0, interval and repetition because they are initialised to 0 (see above link)
        .then((response) => {
            res.send({success: "Card Added"})
        })
        .catch((err) => {
            console.log(err);
            res.send({err: "Try Again Later"})
        });
}