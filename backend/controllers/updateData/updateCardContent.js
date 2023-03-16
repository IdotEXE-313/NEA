const db = require("../../database/connection");

exports.updateCardContent = async(req, res) => {

    const{CardFront, CardBack, CardID} = req.body;

    const updateCardContent = async() => {
        //query for updating card front and card back
        await db.query(`UPDATE card
                        SET CardFront = ?, CardBack = ?
                        WHERE card.CardID = ?`,
                        [CardFront, CardBack, CardID])
            .then((response) => {
                if(response[0].affectedRows > 0){ 
                    res.send({edited: true});
                }
                else{
                    res.send({edited: false});
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    
    if(!(CardFront.length === 0 || CardFront.length > 255)){ //ensures neither the front nor the back of the card fall beyond the boundaries of acceptable lengths
        if(!CardBack.length === 0 || CardBack.length > 255){
            await updateCardContent();
        }
    }
    else{
        res.send({edited: false});
    }
}