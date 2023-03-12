const mysql = require("mysql2/promise");
require("dotenv").config();

const options = ({
    host: 'localhost',
    user: 'root',
    database: 'revisionapp',
    password: process.env.PASSWORD,
    multipleStatements: true
});

const connection = mysql.createPool(options);


module.exports = connection;


