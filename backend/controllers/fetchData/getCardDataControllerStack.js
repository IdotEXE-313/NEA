const db = require("../../database/connection");
const {Stack} = require("../../data-structures/stack");
let stack;

exports.getCardData = async(req, res) => {

    stack = new Stack();

    const deckID = req.body.deckID;

    const addToStack = (cardDataObject) => {
        cardDataObject.map((cardData) => {
            stack.Enqueue(cardData);
        });
    }

    await db.query(`SELECT DATE_FORMAT(card.NextReviewDate, ?), CardID, CardFront, CardBack FROM card, decks 
                    WHERE decks.DeckID = ? AND card.DeckID = ?
                    OR card.IntervalNum = 0
                    AND DATE(card.NextReviewDate) = CURDATE()`, ['%Y-%m-%d', deckID, deckID])
        .then((response) => {
            //  receives response in form {CardFront:, CardBack:}
            addToStack(response[0]);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
        });
    
}

exports.fetchCard = async (req, res) => {
    let cardObject = stack.Dequeue();
    res.send({cardData: cardObject.value});
}