const express = require("express");
const router = express.Router();
const controller = require("../../controllers/api/googleMaps");

router
    .route("/api/google")
    .get(controller.getNearbySchools)

module.exports = router;