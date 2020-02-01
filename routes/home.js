const con = require("./connection");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // if (req.session.email) {
  con.query(`SELECT * FROM board order by id desc`, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.render("home", { result });
  });

  // } else {
  //   res.send();
  // }
});

module.exports = router;
