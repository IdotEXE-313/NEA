const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getCardInfoController");

router
    .route("/card-info/")
    .post(controller.getCardInfo)

module.exports = router;