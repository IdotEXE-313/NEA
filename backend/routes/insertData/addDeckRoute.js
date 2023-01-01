const express = require("express");
const router = express.Router();
const controller = require("../../controllers/insertData/addDeckController");

router
    .route("/add-deck/")
    .post(controller.addDeck)

module.exports = router;