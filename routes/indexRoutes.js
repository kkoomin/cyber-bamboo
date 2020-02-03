const con = require("./connection");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let loggedIn = 0;
  if (req.session.email) {
    loggedIn = 1;
    con.query(`SELECT * FROM board order by id desc`, (err, result) => {
      if (err) console.log(err);
      req.session.board = result;
      // console.log(result);
      res.render("home", { result });
    });
  } else {
    res.render("index", { flag: loggedIn, name: req.session.name });
  }
});

module.exports = router;
