import axios from "axios";

const config = require("../config.json");

// eslint-disable-next-line import/prefer-default-export
export const getNearbyStations = async (location) => {
  if (!location || !location.latitude || !location.longitude) {
    return [];
  }

  try {
    const response = await axios.get(
      `http://${config.server_host}:${config.server_port}/stations` +
        `?latitude=${location.latitude}&longitude=${location.longitude}` +
        `&mileDistance=1`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
