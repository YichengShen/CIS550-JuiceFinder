const express = require("express");

const router = express.Router();

router.use("/vehicles", require("./vehicles"));
router.use("/adaptors", require("./adapters"));
router.use("/stations", require("./stations"));
router.use("/stats", require("./stats"));
router.use("/users", require("./users"));
router.use("/paths", require("./paths"));
router.use("/restaurants", require("./restaurants"));

module.exports = router;
