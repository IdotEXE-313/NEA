const db = require("../../database/connection");

exports.insertVisibleDeck = async(req, res) => {
    const {DeckID, Username} = req.body;

    //This method is used for saving a deck that is listed on the home page as either public or internal
    //Since we can only pass in the DeckID and the Username, we need to select all values manually that are needed to create a new deck


    //Get all the cards from the deck that is to be made visible (either public or internal)
    const getDeckData = async() => {
        //query for selecting card data
        await db.query(`SELECT CardFront, CardBack, CardID, decks.SubjectID, decks.DeckName
                        FROM card, decks
                        WHERE card.DeckID = ?
                        AND card.DeckID = decks.DeckID`,
                        [DeckID])
            .then((response) => {
                    getUserData(response[0]);
            })
    };


    //
    const getUserData = async(cards) => {

        const subjectID = cards[0].SubjectID; //will be used to get the user's folder ID for the given subject

        const getUserID = async() => {
            await db.query(`SELECT UserID
                            FROM users
                            WHERE users.Username = ?`,
                            [Username])
                .then((res) => {
                    getFolderIDAndSchoolID(res[0][0].UserID); //once selected the user ID, get the folder and school id the deck will be created for
                })
        }

        const getFolderIDAndSchoolID = async(UserID) => {
            //query for selecting folder ID and school ID
            await db.query(`SELECT folders.FolderID, users.SchoolID
                            FROM folders, users
                            WHERE folders.UserID = ?
                            AND folders.UserID = users.UserID
                            AND folders.SubjectID = ?`,
                            [UserID, subjectID])
                .then((response) => {
                    createDeck(response[0][0], cards, UserID); //once obtained the folder id and school ID, go on to create the deck
                })
        }
        await getUserID();
    }

    //cards aren't needed yet, but need to pass them for the next function
    const createDeck = async(folderAndSchoolData, cardsData, userID) => {
        const deckID = Math.floor(Date.now() + Math.random());

        //query for creating a deck (any deck that is saved from the home page is inserted as a private deck. This can be changed at a later date)
        await db.query(`INSERT INTO decks (DeckID, DeckName, FolderID, SchoolID, visibility, UserID, SubjectID)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        //now have all the necessary values needed to create a deck
                        [deckID, cardsData[0].DeckName, folderAndSchoolData.FolderID, folderAndSchoolData.SchoolID, "Private", userID, cardsData[0].SubjectName])
            .then((res) => {
                if(res[0].affectedRows > 0){
                    invokeInsertCardsIntoDeck(cardsData, deckID); //now, need to insert all the cards that are presrnt within the public / internal deck
                }
            })
    }

    const invokeInsertCardsIntoDeck = async(cards, deckID) => {
        Object.values(cards).map((values) => { //iterate through each individual's card's data, which will then be used to insert into the newly created deck
            insertCardIntoDeck(values, deckID);
        })
    }

    const insertCardIntoDeck = async(value, deckID) => {
        const cardID = Math.floor(Date.now() + Math.random());
        //query for inserting a card into the newly created deck
        await db.query(`INSERT INTO card (CardID, DeckID, CardFront, CardBack, Priority, NextReviewDate, intervalNum, repitition, efactor)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [cardID, deckID, value.CardFront, value.CardBack, 0, null, 0, 0, 0])
            .then((response) => {
                if(response[0].affectedRows > 0){
                    res.send({inserted: true}); //so long as the data has been inserted, signify success
                }
                else{
                    res.send({inserted: false});
                }
            })
    }

    await getDeckData(); 

}