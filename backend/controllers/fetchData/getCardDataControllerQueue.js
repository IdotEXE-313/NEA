const { Queue } = require("../../data-structures/queue");
const db = require("../../database/connection");
const queue = new Queue();

exports.queueCards = async(req, res) => {

    const deckID = req.body.deckID;

     const addToQueue = (cardDataObject) => {
        cardDataObject.map((cardData) => {
            queue.enqueue(cardData);
        })
    }

    await db.query("SELECT CardFront, CardBack FROM card, decks WHERE decks.DeckID = ? AND card.DeckID = ?", [deckID, deckID])
    .then((response) => {
        //  receives response in form {CardFront:, CardBack:}
        addToQueue(response[0]);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(err);
    });


}

exports.getCardQueue = async(req, res) => {
    const cardDataObject = queue.dequeue();
    if(cardDataObject.value){
        res.send({cardData: cardDataObject});
    }
}
