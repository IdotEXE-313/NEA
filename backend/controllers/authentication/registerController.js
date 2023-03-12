const express = require("express");
const db = require("../../database/connection");

exports.registerUser = async(req, res) => {
    const {username, password, school} = req.body;

    
    const insertUser = async() => {
        await db.query("INSERT INTO users (username, password, schoolid) values(?, ?, ?)", [username, password, school || null])
            .then((res) => {
                res.sendStatus("Inserted");
            })
            .catch((err) => {
                res.send(err.code);
            })
    }

    await insertUser();
}
