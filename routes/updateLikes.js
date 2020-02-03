const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const updatedLikes = req.body.likes * 1 + 1;

  con.query(
    `UPDATE board SET likes=${updatedLikes} WHERE id=${req.body.id}`,
    (err, result) => {
      if (err) console.log(err);
      res.send();
    }
  );
});

module.exports = router;
