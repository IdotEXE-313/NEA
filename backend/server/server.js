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
const getDeckRoute = require("../routes/fetchData/getDecks");
const getDeckDataRoute = require("../routes/fetchData/getDeckData");
const addCardRoute = require("../routes/insertData/addCardRoute");
const getCardDataRouteStack = require("../routes/fetchData/getCardDataStack");
const getCardDataRouteQueue = require("../routes/fetchData/getCardDataQueue");
const updateCardPriority = require("../routes/updateData/updatePriority");
const getUserDataRoute = require("../routes/fetchData/getUserDataRoute");
const updateDateRoute = require("../routes/updateData/nextDateRoute");
const getPublicDecks = require("../routes/fetchData/getPublicDecks");
const getSubjectName = require("../routes/fetchData/getSubjectName");
const getCardData = require("../routes/fetchData/getCardData");
const deleteCardData = require("../routes/deleteData/deleteCard");

//Additional imports for communication with the frontend
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials:true}));
app.use(cookieParser());

//database connection options
const options = ({
    host: 'localhost',
    user: 'root',
    database: 'revisionapp',
    password: process.env.PASSWORD
});

const sessionStore = new MySQLStore(options);

//additional information to be stored in the "data" section of the sessions table, including duration of session
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

//Leads to the controllers for each route

app.use("/", registerRoute);
app.use("/", schoolsRoute);
app.use("/", loginRoute);
app.use("/", logoutRoute);
app.use("/", authRoute);
app.use("/", subjectsRoute);
app.use("/", addSubjectsRoute);
app.use("/", getSubjectsTakenRoute);
app.use("/", addDeckRoute);
app.use("/", getDeckRoute);
app.use("/", getDeckDataRoute);
app.use("/", addCardRoute);
app.use("/", getCardDataRouteStack);
app.use("/", getCardDataRouteQueue);
app.use("/", updateCardPriority);
app.use("/", getUserDataRoute);
app.use("/", updateDateRoute);
app.use("/", getPublicDecks);
app.use("/", getSubjectName);
app.use("/", getCardData);
app.use("/", deleteCardData);


app.listen(3001, () => console.log("Server is running"));
