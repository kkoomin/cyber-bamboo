const con = require("./connection");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const updatedViews = req.body.views * 1 + 1;

  con.query(
    `UPDATE board SET views=${updatedViews} WHERE id=${req.body.id}`,
    (err, result) => {
      if (err) console.log(err);
      res.send();
    }
  );
});

module.exports = router;
