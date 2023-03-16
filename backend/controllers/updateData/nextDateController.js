const db = require("../../database/connection");
const {SuperMemo} = require("../../algorithms/supermemo2");

exports.updateDate = async(req, res) => {
    const {grade, cardID} = req.body; 
    const dateObject = new Date();
    const date = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());

    const fetchData = async() => {
        //need these values for the supermemo algorithm to calculate the next review date
        await db.query("SELECT intervalNum, repitition, efactor FROM card WHERE card.cardID = ?", [cardID])
        .then((response) => {
            const data = response[0][0];
            updateDate(data.intervalNum, data.repitition, data.efactor);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const updateDate = async(_interval, _rep, _efactor) => {
        const supermemo = new SuperMemo(_interval, _rep, _efactor, grade); //pass in the values required
        const {interval, repetition, efactor} = supermemo.superMemo(); //run supermemo on the values passed in and obtain the new values
        date.setDate(date.getDate() + interval); //get the current date (created earlier) and add on the interval to get the new date

        //query for updating the next review date
        await db.query("UPDATE card SET NextReviewDate = ?, intervalNum = ?, repitition = ?, efactor = ? WHERE card.cardID = ?", [date, interval, repetition, efactor, cardID])
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    fetchData();
}