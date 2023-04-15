const express = require("express");
const router = express.Router();
const connection = require("../db");
const axios = require("axios");
const bodyParser = require("body-parser");
const { getCoordinates, getWhereClause } = require("./helper");

router.use(bodyParser.json());

// Route 1: GET /paths/geocode/:fullAddress
router.get("/geocode/:fullAddress", async (req, res) => {
  const fullAddress = req.params.fullAddress;
  try {
    const coordinate = await getCoordinates(fullAddress);
    res.status(200).json(coordinate);
  } catch (err) {
    console.log(err);
    res.status(500).json({});
  }
});

// Route 2: GET /routes/plan/:startLng/:startLat/:destLng/:destLat
router.get("/plan/:startLng/:startLat/:destLng/:destLat", async (req, res) => {
  const { startLng, startLat, destLng, destLat } = req.params;
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.OPENROUTESERVICE_API_KEY}&start=${startLng},${startLat}&end=${destLng},${destLat}`;

  axios
    .get(url)
    .then((response) => {
      const coordinates = response.data.features[0].geometry.coordinates;
      // Probably need to do some interpolations to reduce the number of coordinates
      res.status(200).json(coordinates);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({});
    });
});

// Route 3: POST /routes/nearbyStations
router.post("/nearbyStations", async (req, res) => {
  const maxDistMile = req.query.maxDistMile ?? 10;
  const coordinates = req.body.coordinates;
  const stationLocationColName = "location";

  // Get the regular attributes' constraints
  const validFilters = [
    "state",
    "city",
    "zip",
    "streetAddress",
    "accessCode",
    "alwaysOpen",
    // Ignore location-related constraints for now
    // "latitude",
    // "longitude",
    // "meterDistance",
  ];
  const receivedFilters = {};
  for (const validKeyName of validFilters) {
    const value = req.query[validKeyName];
    if (value || value === "") {
      receivedFilters[validKeyName] = value;
    }
  }

  const whereClause = getWhereClause(receivedFilters);
  // whereClause = "WHERE state = 'CA' AND city = 'San Francisco'"
  //               or empty string

  // Handle the distance constraint along the path
  const distConstraints = [];
  for (const coordinate of coordinates) {
    distConstraints.push(
      `ST_Distance_Sphere(${stationLocationColName}, ST_SRID(ST_GEOMFROMTEXT('POINT(${
        coordinate[0]
      } ${coordinate[1]})'), 4326)) < ${maxDistMile * 1609.34}`
    );
  }
  const distConstraintString = distConstraints.join(" OR ");

  // Combine the queries
  const query = `
    SELECT DISTINCT sid, ST_Y(${stationLocationColName}) AS longitude, ST_X(${stationLocationColName}) AS latitude
    FROM stations
    ${
      whereClause === "" ? "WHERE" : whereClause + " AND"
    } (${distConstraintString})
  `;
  connection.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.status(500).json({});
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = router;
