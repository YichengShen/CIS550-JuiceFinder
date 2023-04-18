const axios = require("axios");

const getCoordinatesFromAddress = async (fullAddress) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    fullAddress
  )}&key=${process.env.GEOCODING_API_KEY}`;
  try {
    const response = await axios.get(url);
    const coordinate = response.data.results[0].geometry.location;
    return {
      latitude: coordinate.lat,
      longitude: coordinate.lng,
    };
  } catch (err) {
    console.log(err);
    return {};
  }
};

const getPlannedPathFromCoordinates = async (
  startLng,
  startLat,
  destLng,
  destLat
) => {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.OPENROUTESERVICE_API_KEY}&start=${startLng},${startLat}&end=${destLng},${destLat}`;

  try {
    const response = await axios.get(url);
    const coordinates = response.data.features[0].geometry.coordinates;
    return coordinates;
  } catch (err) {
    console.log(err);
    return [];
  }
};

module.exports = { getCoordinatesFromAddress, getPlannedPathFromCoordinates };
