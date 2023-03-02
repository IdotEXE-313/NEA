const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getPublicDecksController");

router
    .route("/public-decks/")
    .post(controller.getPublicDecks)

module.exports = router;