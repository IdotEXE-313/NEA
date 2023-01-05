const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getDeckDataController");

router
    .route("/deck-data/")
    .post(controller.getDeckData)

module.exports = router;