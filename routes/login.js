const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  if (!req.body.password || !req.body.email) {
    res.json({ status: "fail", message: "정보를 입력해주세요" });
  } else {
    con.query(
      `SELECT * FROM users WHERE password='${req.body.password}' AND email='${req.body.email}'`,
      (err, result) => {
        if (err) console.log(err);
        let status = "fail";
        let message = `로그인 실패❗ 다시 시도하세요`;
        if (result.length > 0) {
          status = "success";
          req.session.email = result[0].email;
          req.session.name = result[0].name;
          message = `${result[0].name}님 어서오세요👫`;
        }
        res.json({ status, message });
      }
    );
  }
});

module.exports = router;
