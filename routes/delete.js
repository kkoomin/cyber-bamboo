const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("", (req, res) => {
  if (req.session.name == req.body.author) {
    const sql = `DELETE FROM board WHERE author = '${req.body.author}' AND id = '${req.body.id}'`;
    con.query(sql, (err, result) => {
      res.json({ message: "삭제되었습니다!" });
    });
  }
});

module.exports = router;
