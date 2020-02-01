const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { result: req.session.board });
});

module.exports = router;
