const express = require("express");
const router = express.Router();
const controller = require("../../controllers/insertData/addVisibleDeckController");

router
    .route("/insert-visible-deck/")
    .post(controller.insertVisibleDeck)

module.exports = router;