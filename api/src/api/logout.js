const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post(
  "/logout",
  passport.authenticate("google"), (req, res, next) => {
    console.log('logout');
    req.logout( (err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  }
);

module.exports = router;
