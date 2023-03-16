const { Queue } = require("../../data-structures/queue");
const db = require("../../database/connection");
let queue;

exports.queueCards = async(req, res) => {

    const deckID = req.body.deckID;

    queue = new Queue();


    //for every card fetched, add it to the queue
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
    //try and catch needed due to error of queue.dequeue sometimes not being recognised. This prevents the server from crashing
    try{
        const cardObject = queue.dequeue();
        res.send({cardData: cardObject.value});
        
    }
    catch(err){
        console.log(err);
    }
}
