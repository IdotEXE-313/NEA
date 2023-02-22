const { Queue } = require("../../data-structures/queue");
const db = require("../../database/connection");
let queue;

exports.queueCards = async(req, res) => {

    queue = new Queue();

    const deckID = req.body.deckID;

     const addToQueue = (cardDataObject) => {
        cardDataObject.map((cardData) => {
            queue.enqueue(cardData);
        })
    }

    await db.query("SELECT CardID, DeckID, Priority, CardFront, CardBack FROM card WHERE card.DeckID = ? AND card.Priority IS NOT NULL", [deckID])
    .then((response) => {
        console.log(response);
        //  receives response in form {CardFront:, CardBack:}
        addToQueue(response[0]);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(err);
    });


}

exports.getCardQueue = async(req, res) => {
    let cardObject = queue.dequeue();
    let value = cardObject.value;
    value !== null ? res.send({cardData: cardObject.value}) : res.send(null);
}
