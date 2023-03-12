const db = require("../../database/connection");

exports.insertVisibleDeck = async(req, res) => {
    const {DeckID, Username} = req.body;


    //Get all the cards from the visible deck
    const getDeckData = async() => {
        await db.query(`SELECT CardFront, CardBack, CardID, decks.SubjectID, decks.DeckName
                        FROM card, decks
                        WHERE card.DeckID = ?
                        AND card.DeckID = decks.DeckID`,
                        [DeckID])
            .then((response) => {
                    getUserData(response[0]);
            })
    };

    //starts by getting the user id. Second method uses this to get the folder id that the new deck will be inserted into

    const getUserData = async(cards) => {

        const subjectID = cards[0].SubjectID;

        const getUserID = async() => {
            await db.query(`SELECT UserID
                            FROM users
                            WHERE users.Username = ?`,
                            [Username])
                .then((res) => {
                    getFolderIDAndSchoolID(res[0][0].UserID);
                })
        }

        const getFolderIDAndSchoolID = async(UserID) => {
            await db.query(`SELECT folders.FolderID, users.SchoolID
                            FROM folders, users
                            WHERE folders.UserID = ?
                            AND folders.UserID = users.UserID
                            AND folders.SubjectID = ?`,
                            [UserID, subjectID])
                .then((response) => {
                    createDeck(response[0][0], cards, UserID);
                })
        }
        await getUserID();
    }

    //cards aren't needed yet, but need to pass them for the next function
    const createDeck = async(folderAndSchoolData, cardsData, userID) => {
        const deckID = Math.floor(Date.now() + Math.random());
        await db.query(`INSERT INTO decks (DeckID, DeckName, FolderID, SchoolID, visibility, UserID, SubjectID)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [deckID, cardsData[0].DeckName, folderAndSchoolData.FolderID, folderAndSchoolData.SchoolID, "Private", userID, cardsData[0].SubjectName])
            .then((res) => {
                if(res[0].affectedRows > 0){
                    invokeInsertCardsIntoDeck(cardsData, deckID);
                }
            })
    }

    const invokeInsertCardsIntoDeck = async(cards, deckID) => {
        Object.values(cards).map((values) => {
            insertCardIntoDeck(values, deckID);
        })
    }

    const insertCardIntoDeck = async(value, deckID) => {
        const cardID = Math.floor(Date.now() + Math.random());
        await db.query(`INSERT INTO card (CardID, DeckID, CardFront, CardBack, Priority, NextReviewDate, intervalNum, repitition, efactor)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [cardID, deckID, value.CardFront, value.CardBack, 0, null, 0, 0, 0])
            .then((response) => {
                if(response[0].affectedRows > 0){
                    res.send({inserted: true});
                }
                else{
                    res.send({inserted: false});
                }
            })
    }

    await getDeckData();

}