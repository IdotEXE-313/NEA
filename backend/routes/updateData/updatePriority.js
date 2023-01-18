const express = require("express");
const router = express.Router();
const controller = require("../../controllers/updateData/updatePriorityController");

router
    .route("/update-card-stack/")
    .post(controller.updatePriority)

module.exports = router;