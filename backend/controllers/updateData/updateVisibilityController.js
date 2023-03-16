const db = require("../../database/connection");

exports.updateVisibility = async(req, res) => {

    const {newVisibility, deckID} = req.body;


    const updateVisibility = async() => {
        //query for updating card priority
        await db.query(`UPDATE decks 
                        SET visibility = ?
                        WHERE decks.DeckID = ?
                        AND decks.visibility <> ?`,
                        [newVisibility, deckID, newVisibility])
            .then((response) => {
        
                if(response[0].changedRows !== 0){
                    res.send({updated: true}); //only send success response if rows have been affected (signifying a change)
                }
                else{
                    res.send({updated: false});
                }
            })
            .catch((err) => {
                res.send({unexpectedErr: true});
            })
    }
    await updateVisibility();
}