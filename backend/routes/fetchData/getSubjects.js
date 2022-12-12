const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getSubjectsController");

router
    .route("/get-subjects/")
    .get(controller.getSubjects)

module.exports = router;