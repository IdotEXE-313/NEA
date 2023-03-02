const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getSubjectNameController");

router
    .route("/subject-name/")
    .post(controller.getSubjectName)

module.exports = router;
