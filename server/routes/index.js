const express = require("express");

const router = express.Router();

router.use("/vehicles", require("./vehicles"));
router.use("/adaptors", require("./adapters"));
router.use("/stations", require("./stations"));
router.use("/stats", require("./stats"));

module.exports = router;
