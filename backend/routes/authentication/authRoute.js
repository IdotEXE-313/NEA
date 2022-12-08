const express = require("express");
const router = express.Router();
const controller = require("../../controllers/authentication/authController");

router  
    .route("/auth")
    .get(controller.authUser)

module.exports = router;