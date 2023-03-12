const db = require("../../database/connection");

exports.deleteDeck = async(req, res) => {
    const{FolderID, DeckID} = req.body;


    const deleteDeck = async() => {
        await db.query(`DELETE FROM card
                        WHERE card.DeckID = ?;
                        DELETE FROM decks
                        WHERE decks.DeckID = ?
                        AND decks.FolderID = ?`,
                        [DeckID, DeckID, FolderID])
            .then((response) => {
                if(response[0][0].affectedRows > 0){
                    res.send({delete: true})
                }
                else{
                    res.send({delete: false});
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    await deleteDeck();
}