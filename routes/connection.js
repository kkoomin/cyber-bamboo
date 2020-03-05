const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "bamboodb",
  port: "3306",
  dateStrings: "date"
});

console.log("Bamboo_DB_connected!!!");

module.exports = con;
