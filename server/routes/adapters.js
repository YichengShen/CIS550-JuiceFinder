const express = require("express");

const router = express.Router();
const connection = require("../db");

// Route: GET /adapters
router.get("/", (req, res) => {
  const query = `
    SELECT *
    FROM adapters
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
