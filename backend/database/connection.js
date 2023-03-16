const mysql = require("mysql2/promise");
require("dotenv").config(); //allows access to environment variables such as password


const options = ({
    host: 'localhost',
    user: 'root',
    database: 'revisionapp',
    password: process.env.PASSWORD,
    multipleStatements: true
});

const connection = mysql.createPool(options);


module.exports = connection;


