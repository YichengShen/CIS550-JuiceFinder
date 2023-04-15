const express = require("express");

const router = express.Router();

router.use("/vehicles", require("./vehicles"));
router.use("/stats", require("./stats"));
router.use("/users", require("./users"));
router.use("/paths", require("./paths"));

module.exports = router;
