const express = require("express");
const router = express.Router();
const controller = require("../../controllers/authentication/loginController");

router
    .route("/login/")
    .post(controller.authenticateUser)

module.exports = router;