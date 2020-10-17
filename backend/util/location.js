const axios = require("axios");
const HttpError = require("../models/http-error");

const GOOGLE_API_KEY = "AIzaSyC2bbOW0Baep5VjKsD5KHk3Nf_D5f7Pc2c";

const getCoordsForAddress = async (adress) => {
  console.log("GetAPI: ", adress);
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    adress
  )}&key=${GOOGLE_API_KEY}
    `);
  const data = response.data;
  const coordinate = data.results[0].geometry.location;
  if (!data || data.status === "ZERO_RESULTS") {
    throw new HttpError("The address was not valid!, plaese try again!", 422);
  }
  return coordinate;
};

module.exports = getCoordsForAddress;
