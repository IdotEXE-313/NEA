const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const MySQLStore = require("express-mysql-session")(session);
const env = require("dotenv").config({path:'../.env'});

//Routes
const registerRoute = require("../routes/authentication/registerRoute");

app.use(express.urlencoded({extended: true}));
app.use(cors({origin: 'http://localhost:3000'}));

//Config options for connecting to database
const connectOptions = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'revisionapp',
    password: process.env.PASSWORD
}

const sessionStore = new MySQLStore(connectOptions);


//Config options for session cookie
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        sameSite: "strict",
        secure: false,
        maxAge: 86400000
    }
}))

app.use("/", registerRoute);


app.listen(3001, () => console.log("Server is running"));
