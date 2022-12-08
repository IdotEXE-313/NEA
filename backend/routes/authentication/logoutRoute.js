const express = require("express");
const router = express.Router();
const controller = require("../../controllers/authentication/logoutController");

router
    .route("/logout/")
    .get(controller.logoutUser)

module.exports = router;