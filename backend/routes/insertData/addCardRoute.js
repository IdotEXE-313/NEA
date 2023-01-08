const express = require("express");
const router = express.Router();
const controller = require("../../controllers/insertData/addCardController");

router
    .route("/add-card/")
    .post(controller.addCard)

module.exports = router;