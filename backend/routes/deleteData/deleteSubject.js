const express = require("express");
const router = express.Router();
const controller = require("../../controllers/deleteData/deleteSubjectController");

router
    .route("/delete-subject/")
    .post(controller.deleteSubject)

module.exports = router;