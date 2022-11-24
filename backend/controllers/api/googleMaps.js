const axios = require("axios");
const dotenv = require("dotenv").config();
const key = process.env.GOOGLEMAPSAPIKEY;
const flatted = require("flatted");

exports.getNearbySchools = async(req, res) => {
    
    const postcode = req.body.postcode;

    //first, we need to get the coordinates of the users' location. This is used with the postcode; the coordinates returned from this will be used to find nearby schools
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=CB249LQ&components=postal_code&key=${key}`);
    res.send(JSON.stringify(response.data));
}