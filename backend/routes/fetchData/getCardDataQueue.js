const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getCardDataControllerQueue");

router
    .route("/card-data-queue/")
    .post(controller.queueCards)
    .get(controller.getCardQueue)

module.exports = router;