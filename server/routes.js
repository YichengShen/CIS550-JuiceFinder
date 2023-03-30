const mysql = require("mysql");

// Creates MySQL connection using database credential provided in .env
const connection = mysql.createConnection({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB,
});
connection.connect((err) => err && console.log(err));

const helloworld = async function (req, res) {
  res.send("Hello world!");
};

module.exports = {
  helloworld,
};
