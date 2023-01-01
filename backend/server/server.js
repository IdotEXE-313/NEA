const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cookieParser = require("cookie-parser");
require("dotenv").config();

//Routes
const registerRoute = require("../routes/authentication/registerRoute");
const schoolsRoute = require("../routes/fetchData/getSchools");
const loginRoute = require("../routes/authentication/loginRoute");
const logoutRoute = require("../routes/authentication/logoutRoute");
const authRoute = require("../routes/authentication/authRoute");
const subjectsRoute = require("../routes/fetchData/getSubjects");
const addSubjectsRoute = require("../routes/insertData/addSubjectRoute");
const getSubjectsTakenRoute = require("../routes/fetchData/getSubjectsTaken");
const addDeckRoute = require("../routes/insertData/addDeckRoute");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials:true}));
app.use(cookieParser());

const options = ({
    host: 'localhost',
    user: 'root',
    database: 'revisionapp',
    password: process.env.PASSWORD
});

const sessionStore = new MySQLStore(options);

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
}));

app.use("/", registerRoute);
app.use("/", schoolsRoute);
app.use("/", loginRoute);
app.use("/", logoutRoute);
app.use("/", authRoute);
app.use("/", subjectsRoute);
app.use("/", addSubjectsRoute);
app.use("/", getSubjectsTakenRoute);
app.use("/", addDeckRoute);


app.listen(3001, () => console.log("Server is running"));
