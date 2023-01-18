const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getCardDataControllerStack");

router
    .route("/card-data-stack/")
    .post(controller.getCardData)
    .get(controller.fetchCard)


module.exports = router;