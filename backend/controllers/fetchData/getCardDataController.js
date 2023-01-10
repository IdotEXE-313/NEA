const db = require("../../database/connection");
const {Stack, Node} = require("./../../data-structures/stack");

exports.getCardData = async(req, res) => {

    let stack = new Stack();

    const deckID = req.body.deckID;

    await db.query("SELECT CardFront, CardBack FROM card, decks WHERE decks.DeckID = ? AND card.DeckID = ?", [deckID, deckID])
        .then((response) => {
            addToStack(response[0][0]);
        })
        .catch((err) => {
            console.log(err);
        });
    
    const addToStack = (cardDataObject) => {
        
    }
}