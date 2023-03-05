const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getInternalDecksController");

router
    .route("/internal-decks/")
    .post(controller.getInternalDecks)

module.exports = router;