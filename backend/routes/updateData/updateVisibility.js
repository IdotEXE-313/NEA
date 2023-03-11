const express = require("express");
const router = express.Router();
const controller = require("../../controllers/updateData/updateVisibilityController");

router
    .route("/update-visibility/")
    .post(controller.updateVisibility)

module.exports = router;