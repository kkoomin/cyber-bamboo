const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  if (req.session.email) {
    const sql = `INSERT INTO board (author,title,content) VALUES ('${req.session.name}','${req.body.title}','${req.body.content}')`;
    con.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json({ message: "글 등록 실패❌" });
      } else {
        console.log("Board insert success!");
        res.json({ message: "글 등록 성공✅" });
      }
    });
  } else {
    res.json({ message: "로그인 먼저 하세요🐋" });
  }
});

module.exports = router;
