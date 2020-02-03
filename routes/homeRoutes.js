const con = require("./connection");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.email) {
    res.render("index");
  } else {
    con.query(`SELECT * FROM board order by id desc`, (err, result) => {
      if (err) console.log(err);
      req.session.board = result;

      res.render("home", { result, user: req.session.user });
    });
  }
});

module.exports = router;
