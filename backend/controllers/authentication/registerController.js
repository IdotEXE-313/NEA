const express = require("express");
const db = require("../../database/connection");

exports.registerUser = async(req, res) => {
    const {username, password, school} = req.body;
    
    const insertUser = async() => {
        await db.query("INSERT INTO users (username, password, schoolid) values(?, ?, ?)", [username, password, school])
            .then((res) => {
                res.sendStatus("Inserted");
            })
            .catch((err) => {
                errorHandle(err);
            })
    }

    const errorHandle = (err) => {
        const errorName = err.code;

        switch(errorName){
            case('ER_BAD_NULL_ERROR'):
                res.send({nullIssue: "One of your fields has been left empty"});
                break;
            case('ER_DUP_ENTRY'):
                res.send({duplicate: "This username is already in use."});
                break;
            default:
                res.send({unexpected: "An unexpected error has occured"});
                break;
        }
    }
    await insertUser();
}
