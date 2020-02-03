const mysql = require("mysql");

const con = mysql.createConnection({
  host: "70.12.113.173",
  user: "test",
  password: "test",
  database: "bamboodb",
  port: "3307",
  dateStrings: "date"
});

console.log("Bamboo_DB_connected!!!");

module.exports = con;
