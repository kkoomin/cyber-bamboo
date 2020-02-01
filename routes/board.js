const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("/board", (req, res) => {
  con.query(`SELECT * FROM board order by bo_no desc`, (err, result) => {
    if (err) console.log(err);
    res.render("board", { ID: "게시판보기" }, result);
  });
});

module.exports = router;
