const { Queue } = require("../../data-structures/queue");
const db = require("../../database/connection");
let queue;

exports.queueCards = async(req, res) => {

    queue = new Queue();

    const deckID = req.body.deckID;

     const addToQueue = (cardDataObject) => {
        cardDataObject.map((cardData) => {
            queue.enqueue(cardData);
        });
        res.send({finished: true});
    }

    await db.query("SELECT CardID, DeckID, Priority, CardFront, CardBack FROM card WHERE card.DeckID = ? AND card.Priority IS NOT NULL", [deckID])
    .then((response) => {
        //  receives response in form {CardFront:, CardBack:}
        addToQueue(response[0]);
    })
    .catch((err) => {
        console.log(err);
    });


}

exports.getCardQueue = (req, res) => {
    try{
        const cardObject = queue.dequeue();
        res.send({cardData: cardObject.value});
        
    }
    catch(err){
        console.log(err);
    }
}
