const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("", (req, res) => {
  if (req.session.user) {
    const sql = `DELETE FROM board WHERE author='${req.se}'`;
  }
});

module.exports = router;
