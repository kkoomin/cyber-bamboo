const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  con.query(`SELECT * FROM board WHERE id=${req.body.id}`, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.json({ result });
  });
});

module.exports = router;
