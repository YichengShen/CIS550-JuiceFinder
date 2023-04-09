const express = require("express");
const router = express.Router();
const connection = require("../db");

// Route 1: GET /vehicles
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;

  // Calculate offset
  const offset = (page - 1) * (pageSize || 0);

  let query = `
        SELECT *
        FROM electric_vehicles
    `;

  if (pageSize !== null) {
    query += `LIMIT ${pageSize} OFFSET ${offset}`;
  }

  connection.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.status(500).json({});
    } else {
      res.status(200).json(data);
    }
  });
});

// Route 2: GET /vehicles/:id
router.get("/:id", (req, res) => {
  connection.query(
    `
          SELECT *
          FROM electric_vehicles
          WHERE id='${req.params.id}'
        `,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({});
      } else if (data.length === 0) {
        res.status(204).json({});
      } else {
        res.status(200).json(data);
      }
    }
  );
});

module.exports = router;
