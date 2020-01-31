const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("Bamboo_DB_connected!!!");

  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  con.connect((err) => {
    var sql = `INSERT INTO users (name,email,password) VALUES ('${name}','${email}','${password}')`;

    con.query(sql, function(err, result) {
      if (err) throw err;
      if (err || name == 0 || email == 0 || password == 0) {
        console.log("Insert Fail⛔ please retry🌈");
        res.json({ message: `뭔가 잘못됬어요 다시 시도해주세요❗` });
      } else {
        console.log("Insert Success!✅");
        console.log(req.body);
        res.json({ message: `회원가입이 완료되었습니다. 환영합니다~💓` });
      }
    });
  });
});

module.exports = router;
