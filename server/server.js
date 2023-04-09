require("dotenv").config();
const express = require("express");
const cors = require("cors");
const config = require("./config");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// Add new routes inside ./routes and edit index.js respectively
app.use(require("./routes"));

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  );
});

module.exports = app;
