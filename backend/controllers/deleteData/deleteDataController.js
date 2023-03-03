const db = require("../../database/connection");


exports.deleteCard = async(req, res) => {

    const cardID = req.body.cardID;

    const deleteCard = async() => {
        await db.query(`DELETE FROM card
                        WHERE card.CardID = ?`, [cardID])
            .then((response) => {
                console.log(response);
                res.send(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    await deleteCard();
}