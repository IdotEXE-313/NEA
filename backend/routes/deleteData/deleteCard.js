const express = require("express");
const router = express.Router();
const controller = require("../../controllers/deleteData/deleteDataController");

router
    .route("/delete-card")
    .post(controller.deleteCard)

module.exports = router;