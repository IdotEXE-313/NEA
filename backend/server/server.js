const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const MySQLStore = require("express-mysql-session")(session);
const config = require("../config.json");

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
    password: config["PASSWORD"]
};

const sessionStore = new MySQLStore(connectOptions);


//Config options for session cookie
app.use(session({
    secret: config["SECRET"],
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        sameSite: "strict",
        secure: false,
        maxAge: 86400000
    }
}))

app.use("/register/", registerRoute);




app.listen(3001, () => console.log("Server is running"));
