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

    const getNextReviewDate = async() => {
        await db.query(`SELECT NextReviewDate FROM card
                        WHERE card.DeckID = ?
                        ORDER BY NextReviewDate ASC`,
                        [deckID])
            .then((response) => {
                res.send({noData: true, nextDate: response[0][0]});
            })
            .catch((err) => {
                console.log(err);
            })
    }

    await db.query(`SELECT DATE_FORMAT(card.NextReviewDate, ?), CardID, CardFront, CardBack FROM card, decks 
                    WHERE decks.DeckID = ? AND card.DeckID = ?
                    AND DATE(card.NextReviewDate) <= CURDATE()`, ['%Y-%m-%d', deckID, deckID])
        .then((response) => {
            //  receives response in form {CardFront:, CardBack:}
            if(response[0].length > 0){
                addToStack(response[0]);
            }
            else{
                getNextReviewDate();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    
}

exports.fetchCard = async (req, res) => {
    let cardObject = stack.Dequeue();
    res.send({cardData: cardObject.value});
}