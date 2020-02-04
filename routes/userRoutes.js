const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  let name = con.escape(req.body.name.replace(/ /gi, ""));
  let password = con.escape(req.body.password);
  let email = con.escape(req.body.email);

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
  }
  if (validateEmail(req.body.email)) {
    let sql = `INSERT INTO users (name,email,password) VALUES (${name}, ${email}, ${password})`;
    console.log(`${name}, ${email}, ${password}`);

    con.query(sql, function(err, result) {
      if (
        err ||
        !name ||
        !email ||
        !password ||
        name == "" ||
        email == "" ||
        password == ""
      ) {
        console.log("Insert Fail⛔");
        console.log(err);
        res.json({ message: `뭔가 잘못됐어요 다시 시도해주세요❗` });
      } else {
        console.log("Insert Success!✅");
        console.log(req.body);
        res.json({ message: `회원가입이 완료되었습니다. 환영합니다~💓` });
      }
    });
  } else {
    res.json({ message: `이메일 형식을 맞춰주세요❗example@email.com` });
  }
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

router.post("/updateProfile", (req, res) => {
  const updateUsername = req.body.name;
  const updateUseremail = req.body.email;

  con.query(
    `UPDATE users SET name='${updateUsername}',email='${updateUseremail}' WHERE email='${req.session.email}'`,
    (err, result) => {
      console.log(result);
      if (err) console.log(err);
      // req.session.user = result[0];
      con.query(
        `SELECT * FROM users WHERE id='${req.session.user.id}'`,
        (err, result) => {
          console.log(result[0]);
          req.session.user = result[0];
          res.json({ user: result[0] });
        }
      );
    }
  );
});

module.exports = router;
