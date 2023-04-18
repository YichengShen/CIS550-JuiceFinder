const express = require("express");

const router = express.Router();
const connection = require("../db");

// Route 1: GET /restaurants/:restaurantID
router.get("/:restaurantID", async (req, res) => {
  const restaurantID = req.params.restaurantID;
  const query = `
    SELECT * FROM restaurants WHERE business_id = '${restaurantID}'
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

// Route 2: GET /restaurants/nearby/:longitude/:latitude
router.get("/nearby/:longitude/:latitude", async (req, res) => {
  const { longitude, latitude } = req.params;
  let { maxDistMile, sortBy } = req.query;
  maxDistMile = maxDistMile ?? 1;
  sortBy = sortBy ?? "distance";
  const { day, period, category } = req.query;
  const periodRegex = /^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/; // Regular expression to validate the format of the period

  if (period && !periodRegex.test(period)) {
    res
      .status(400)
      .json({ error: "Invalid period format. Should be like 8:30-17:00" });
  }
  const [startTime, endTime] = period?.split("-") ?? ["", ""];

  // Validate sortBy parameter
  if (sortBy && !["distance", "stars", "review_count"].includes(sortBy)) {
    res.status(400).json({ error: "Invalid sortBy option" });
  }

  let periodQuery = ``;
  if (day && period) {
    periodQuery = `
      AND TIME('${startTime}') >= TIME(SUBSTRING_INDEX(JSON_UNQUOTE(JSON_EXTRACT(hours, CONCAT('$."', '${day}', '"'))), '-', 1))
      AND TIME('${endTime}') <= TIME(SUBSTRING_INDEX(JSON_UNQUOTE(JSON_EXTRACT(hours, CONCAT('$."', '${day}', '"'))), '-', -1))
    `;
  } else if (day && !period) {
    periodQuery = `
      AND JSON_EXTRACT(hours, CONCAT('$."', '${day}', '"')) IS NOT NULL
    `;
  } else if (!day && period) {
    const dayQuery = [];
    [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].forEach((eachDay) => {
      dayQuery.push(`
      TIME('${startTime}') >= TIME(SUBSTRING_INDEX(JSON_UNQUOTE(JSON_EXTRACT(hours, CONCAT('$."', '${eachDay}', '"'))), '-', 1))
      AND TIME('${endTime}') <= TIME(SUBSTRING_INDEX(JSON_UNQUOTE(JSON_EXTRACT(hours, CONCAT('$."', '${eachDay}', '"'))), '-', -1))
      `);
    });
    periodQuery = `
      AND (${dayQuery.join(" OR ")})
    `;
  } else {
    periodQuery = "";
  }

  const distanceString = `ST_Distance_Sphere(location, ST_SRID(ST_GEOMFROMTEXT('POINT(${longitude} ${latitude})'), 4326))`;
  const query = `
    SELECT *, ${distanceString} AS distance FROM restaurants
    WHERE ${distanceString} < ${maxDistMile * 1609.34}
    ${category ? `AND categories LIKE '%${category}%'` : ""}
    ${periodQuery}
    ORDER BY ${sortBy === "distance" ? "distance" : `${sortBy} DESC`}
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
