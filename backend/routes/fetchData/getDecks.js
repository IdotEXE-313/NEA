const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getDecksController");

router
    .route("/get-decks/")
    .post(controller.getDecks)

module.exports = router;