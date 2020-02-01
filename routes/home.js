const con = require("./connection");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  con.query(`SELECT * FROM board order by id desc`, (err, result) => {
    if (err) console.log(err);
    // console.log(result);
    res.render("home", { result });
  });
});

module.exports = router;
