const mysql = require('mysql');

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mysql",
    database:"bamboodb",
    port:"3307",
    dateStrings:"date"
});

module.exports=con;