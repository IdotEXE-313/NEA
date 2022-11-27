const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const MySQLStore = require("express-mysql-session")(session);
require("dotenv").config();

//Routes
const registerRoute = require("../routes/authentication/registerRoute");
const schoolsRoute = require("../routes/fetchData/getSchools");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
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
        maxAge: 86400000 //24 hours in milliseconds. Session expires after 24 hours
    }
}))

app.use("/", registerRoute);
app.use("/", schoolsRoute);


app.listen(3001, () => console.log("Server is running"));
