const express = require("express");
const router = express.Router();
const controller = require("../../controllers/insertData/addSubjectController");

router
    .route("/insert-subject/")
    .post(controller.addSubject)

module.exports = router;