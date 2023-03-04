const express = require("express");
const router = express.Router();
const controller = require("../../api/sendText");

router
    .route("/send-text/")
    .post(controller.sendText)

module.exports = router;