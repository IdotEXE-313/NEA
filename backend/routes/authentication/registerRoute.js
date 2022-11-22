const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/authentication/registerController");

router
    .route("/register/")
    .post(registerController.registerUser)

module.exports = router;

