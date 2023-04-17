const axios = require("axios");

const getCoordinatesFromAddress = async (fullAddress) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    fullAddress
  )}&format=json&limit=1`;

  try {
    const response = await axios.get(url);
    const data = response.data[0];
    return {
      latitude: data.lat,
      longitude: data.lon,
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
