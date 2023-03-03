const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getCardDataController");

router
    .route("/card-data/")
    .post(controller.getCardData)

module.exports = router;