const express = require("express");
const router = express.Router();
const controller = require("../../controllers/updateData/updateCardContent");

router
    .route("/edit-card/")
    .post(controller.updateCardContent)

module.exports = router;