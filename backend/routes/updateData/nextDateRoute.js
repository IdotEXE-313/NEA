const express = require("express");
const router = express.Router();
const controller = require("../../controllers/updateData/nextDateController");

router
    .route("/update-date/")
    .post(controller.updateDate)

module.exports = router;