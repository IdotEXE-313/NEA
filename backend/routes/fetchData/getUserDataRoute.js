const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getUserDataController");

router
    .route("/user-data/")
    .post(controller.getUserData)

module.exports = router;