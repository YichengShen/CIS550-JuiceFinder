import axios from "axios";

const config = require("../config.json");

// eslint-disable-next-line import/prefer-default-export
export const getNearbyStations = async (location, maxDistance) => {
  if (!location || !location.latitude || !location.longitude) {
    return [];
  }

  try {
    const response = await axios.get(
      `http://${config.server_host}:${config.server_port}/stations` +
        `?latitude=${location.latitude}&longitude=${location.longitude}` +
        `&mileDistance=${maxDistance}&pageSize=${150}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await axios.get(
      `http://${config.server_host}:${config.server_port}/paths/geocode/${address}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const getPath = async (start, end) => {
  try {
    const response = await axios.get(
      `http://${config.server_host}:${config.server_port}/paths/plan` +
        `/${start.longitude}/${start.latitude}/${end.longitude}/${end.latitude}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
