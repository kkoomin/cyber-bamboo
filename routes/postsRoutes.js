const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("/createPost", (req, res) => {
  if (req.session.email) {
    const sql = `INSERT INTO board (author,title,content,views) VALUES ('${req.session.name}','${req.body.title}','${req.body.content}', 1)`;
    if (req.body.title && req.body.content) {
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
      res.json({ message: "글 제목과 내용을 입력해주세요 ❌" });
    }
  } else {
    res.json({ message: "로그인 먼저 하세요🐋" });
  }
});

router.post("/deletePost", (req, res) => {
  if (req.session.name == req.body.author) {
    const sql = `DELETE FROM board WHERE author = '${req.body.author}' AND id = '${req.body.id}'`;
    con.query(sql, (err, result) => {
      res.json({ message: "삭제되었습니다!" });
    });
  } else {
    res.json({ message: "니가 쓴 글이 아니므니다😒" });
  }
});

router.post("/getPosts", (req, res) => {
  con.query(`SELECT * FROM board WHERE id=${req.body.id}`, (err, result) => {
    const postData = result[0];
    con.query(
      `SELECT * FROM comments WHERE post_id=${req.body.id}`,
      (err, result) => {
        if (err) console.log(err);
        const comments = result;
        res.json({ postData, comments });
      }
    );
    if (err) console.log(err);
  });
});

router.post("/updateViews", (req, res) => {
  const updatedViews = req.body.views * 1 + 1;

  con.query(
    `UPDATE board SET views=${updatedViews} WHERE id=${req.body.id}`,
    (err, result) => {
      if (err) console.log(err);
      res.send();
    }
  );
});

router.post("/updateLikes", (req, res) => {
  const updatedLikes = req.body.likes * 1 + 1;

  con.query(
    `UPDATE board SET \`like\`=${updatedLikes} WHERE id=${req.body.id}`,
    (err, result) => {
      if (err) console.log(err);
      res.json({ message: "👍좋아요가 추가됬습니다." });
    }
  );
});

router.post("/postComment", (req, res) => {
  const sql = `INSERT INTO comments (post_id, content, author) VALUES (${req.body.post_id}, '${req.body.content}', '${req.session.name}')`;

  if (req.body.content) {
    con.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json({ message: "댓글 등록 실패❌" });
      } else {
        console.log("Comment insert success!");
        res.json({ message: "댓글 등록 성공✅" });
      }
    });
  } else {
    res.json({ message: "댓글 내용을 입력해주세요 ❌" });
  }
});

router.post("/deleteComment", (req, res) => {
  if (req.session.name == req.body.author) {
    const sql = `DELETE FROM comments WHERE id = '${req.body.id}'`;
    con.query(sql, (err, result) => {
      res.json({ message: "삭제되었습니다!" });
    });
  } else {
    res.json({ message: "니가 쓴 댓글이 아니므니다😒" });
  }
});

module.exports = router;
