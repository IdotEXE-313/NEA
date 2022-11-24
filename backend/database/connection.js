const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'revisionapp',
    password: dotenv.PASSWORD
});

module.exports = connection;

