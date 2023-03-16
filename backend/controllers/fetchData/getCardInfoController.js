const db = require("../../database/connection");


exports.getCardInfo = async(req, res) => {

    const cardID = req.body.CardID;

    
    const getCardInfo = async() => {
        await db.query(`SELECT CardFront, CardBack
                        FROM card
                        WHERE card.CardID = ? `, [cardID])
            .then((response) => {
                res.send({response, cardID});
            })
            .catch((err) => {
                console.log(err);
            })
    }

    await getCardInfo();
}