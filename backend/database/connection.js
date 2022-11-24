const mysql = require("mysql2/promise");
const dotenv = require("dotenv").config();

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'revisionapp',
    password: process.env.PASSWORD,
});

module.exports = connection;

