const db = require("../../database/connection");

exports.updateVisibility = async(req, res) => {

    const {newVisibility, deckID} = req.body;

    const updateVisibility = async() => {
        await db.query(`UPDATE decks 
                        SET visibility = ?
                        WHERE decks.DeckID = ?
                        AND decks.visibility <> ?`,
                        [newVisibility, deckID, newVisibility])
            .then((response) => {
        
                if(response[0].changedRows !== 0){
                    res.send({updated: true});
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