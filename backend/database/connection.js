const mysql = require("mysql2");
const config = require("../config.json")

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'revisionApp',
    password: config["PASSWORD"]
});

module.exports = connection;

