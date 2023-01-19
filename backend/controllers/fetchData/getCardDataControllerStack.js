const db = require("../../database/connection");
const {Stack} = require("../../data-structures/stack");
const stack = new Stack();

exports.getCardData = async(req, res) => {

    const deckID = req.body.deckID;

    const addToStack = (cardDataObject) => {
        cardDataObject.map((cardData) => {
            stack.Enqueue(cardData);
        });
    }

    await db.query("SELECT CardID, CardFront, CardBack FROM card, decks WHERE decks.DeckID = ? AND card.DeckID = ?", [deckID, deckID])
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