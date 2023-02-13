const db = require("../../database/connection");
const {SuperMemo} = require("../../algorithms/supermemo2");

exports.updateDate = async(req, res) => {
    const {grade, cardID} = req.body; 
    const dateObject = new Date();
    const date = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());

    const fetchData = async() => {
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
        const supermemo = new SuperMemo(_interval, _rep, _efactor, grade);
        const {interval, repetition, efactor} = supermemo.superMemo();
        date.setDate(date.getDate() + interval);

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