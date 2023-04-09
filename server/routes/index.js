const express = require("express");
const router = express.Router();

router.use("/vehicles", require("./vehicles"));

module.exports = router;
