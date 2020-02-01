const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  con.query(`SELECT * FROM board ORDER BY id DESC`, (err, result) => {
    if (err) console.log(err);
    req.session.board = result;
    res.send();
  });
});

module.exports = router;
