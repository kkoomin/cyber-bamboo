const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // if (req.session.email) {
  res.render("home");
  // } else {
  //   res.send();
  // }
});

module.exports = router;
