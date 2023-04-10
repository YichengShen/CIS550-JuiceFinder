const express = require("express");

const router = express.Router();

router.use("/vehicles", require("./vehicles"));
router.use("/adaptors", require("./adapters"));
router.use("/stations", require("./stations"));

module.exports = router;
