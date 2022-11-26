const express = require("express");
const router = express.Router();
const controller = require("../../controllers/fetchData/getSchoolsController");

router
    .route("/schools/")
    .post(controller.getSchools)

module.exports = router;