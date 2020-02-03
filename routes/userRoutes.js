const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  var sql = `INSERT INTO users (name,email,password) VALUES ('${name}','${email}','${password}')`;

  con.query(sql, function(err, result) {
    if (err || !name || !email || !password) {
      console.log("Insert Fail⛔");
      res.json({ message: `뭔가 잘못됐어요 다시 시도해주세요❗` });
    } else {
      console.log("Insert Success!✅");
      console.log(req.body);
      res.json({ message: `회원가입이 완료되었습니다. 환영합니다~💓` });
    }
  });
});

router.post("/login", (req, res) => {
  if (!req.body.password || !req.body.email) {
    res.json({ status: "fail", message: "정보를 입력해주세요⛔" });
  } else {
    con.query(
      `SELECT * FROM users WHERE password='${req.body.password}' AND email='${req.body.email}'`,
      (err, result) => {
        if (err) console.log(err);
        let status = "fail";
        let message = `로그인 실패 다시 시도하세요⛔`;
        if (result.length > 0) {
          status = "success";
          req.session.user = result[0];
          req.session.email = result[0].email;
          req.session.name = result[0].name;
          message = `🎋${result[0].name}님 어서오세요🎋`;
        }
        res.json({ status, message });
      }
    );
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "로그아웃 되었삼 👋" });
  });
});

module.exports = router;
