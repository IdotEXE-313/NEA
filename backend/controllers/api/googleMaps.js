const axios = require("axios");
const config = require("../../config.json");

exports.getNearbySchools = async(req, res) => {
    const key = config["GoogleMapsAPIKey"];

    const response = await axios.get($`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.205276,0.119167&radius=10000&type=school&key=${key}`)
}