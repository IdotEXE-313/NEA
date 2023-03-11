const express = require("express");
const router = express.Router();
const controller = require("../../controllers/deleteData/deleteDeckController");

router
    .route("/delete-deck/")
    .post(controller.deleteDeck)

module.exports = router;