const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getSubjectsTakenController");

router
    .route("/subjects-taken")
    .get(controller.getSubjectsTaken)

module.exports = router;