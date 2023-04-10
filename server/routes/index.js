const express = require("express");
const router = express.Router();

router.use("/vehicles", require("./vehicles"));
router.use("/stats", require("./stats"));


module.exports = router;
