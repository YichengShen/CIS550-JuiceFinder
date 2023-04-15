const express = require("express");

const router = express.Router();
const connection = require("../db");
const { getWhereClause } = require("./helper");

// Route: GET /stations
router.get("/", (req, res) => {
  console.log(req.query);
  const page = req.query.page;
  const pageSize = req.query.pageSize ?? 50;
  const validFilters = [
    "state",
    "city",
    "zip",
    "streetAddress",
    "accessCode",
    "alwaysOpen",
    "latitude",
    "longitude",
    "meterDistance",
  ];
  const receivedFilters = {};
  for (let i = 0; i < validFilters.length; i += 1) {
    const key = validFilters[i];
    const value = req.query[key];
    if (value || value === "") {
      receivedFilters[key] = value;
    }
  }
  const whereClause = getWhereClause(receivedFilters);

  const query = `
    SELECT *
    FROM stations
    ${whereClause}
    ORDER BY sid
    LIMIT ${pageSize}
    ${page ? `OFFSET ${(page - 1) * pageSize}` : ""}
  `;

  console.log(query);
  // res.status(200).send(query);

  connection.query(query, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({});
    } else if (data.length === 0) {
      res.status(404).json({});
    } else {
      res.status(200).json(data);
    }
  });
});

// Route: GET /stations/electric
router.get("/electric", (req, res) => {
  const page = req.query.page;
  const pageSize = req.query.pageSize ?? 50;

  const query = `
    SELECT * ${
      req.query.orderBy === "num_ports"
        ? ", e.ev_level1_evse_num + e.ev_level2_evse_num + e.ev_dc_fast_num AS num_ports"
        : ""
    }
    FROM stations S NATURAL JOIN electric_stations E
    ORDER BY ${req.query.orderBy ?? "sid"}
    LIMIT ${pageSize}
    ${page ? `OFFSET ${(page - 1) * pageSize}` : ""}
  `;

  connection.query(query, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({});
    } else if (data.length === 0) {
      res.status(404).json({});
    } else {
      res.status(200).json(data);
    }
  });
});

// Route: GET /stations/:id
router.get("/:id", (req, res) => {
  const query = `
        SELECT *
        FROM stations
        WHERE sid='${req.params.id}'
    `;

  connection.query(query, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({});
    } else if (data.length === 0) {
      res.status(404).json({});
    } else {
      res.status(200).json(data[0]);
    }
  });
});

// Route: GET /stations/electric/:id
router.get("/electric/:id", (req, res) => {
  const query = `
        SELECT *
        FROM stations NATURAL JOIN electric_stations
        WHERE sid='${req.params.id}'
    `;

  connection.query(query, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({});
    } else if (data.length === 0) {
      res.status(404).json({});
    } else {
      res.status(200).json(data[0]);
    }
  });
});

module.exports = router;
