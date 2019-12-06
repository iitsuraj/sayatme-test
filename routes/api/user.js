var router = require("express").Router();
var User = require("../../models/user");
var Profile = require("../../models/profile");
var jwt = require("jsonwebtoken");
var secret = require("../../config/secret");
var passport = require("passport");

// Load Input ValidationInput
var registerIputValidation = require("../../validation/register");
var loginIputValidation = require("../../validation/login");

// @route     Get api/register
// @desc      Register User
// @access    Public
router.post("/register", function(req, res, next) {
  const { errors, isValid } = registerIputValidation(req.body);
  console.log(req.body);
  // Check Validation
  if (!isValid) {
    console.log(errors);
    return res.status(400).json(errors);
  } else {
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    User.findOne(
      { $or: [{ email: req.body.email }, { username: req.body.username }] },
      function(err, existinguser) {
        if (err) return next(err);
        if (existinguser) {
          if (req.body.email === existinguser.email) {
            errors.email = "E-mail already exists";
            res.status(400).json(errors);
          } else {
            errors.username = "Username already exists";
            res.status(400).json(errors);
          }
        } else {
          user.save(function(err, user) {
            if (err) return next(err);
            var profile = new Profile();
            profile.username = user.username;
            profile.save((err, profile) => {
              if (err) return next(err);
              res.json({ user: user });
            });
          });
        }
      }
    );
  }
});

// @route     Get api/login
// @desc      Login User
// @access    Public
router.post("/login", function(req, res, next) {
  const { errors, isValid } = loginIputValidation(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) return next(err);
      // check for user
      if (!user) {
        errors.email = "No user found";
        return res.status(404).json(errors);
      }
      if (!user.comparePassword(req.body.password)) {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      } else {
        var payload = {
          id: user._id,
          email: user.email,
          username: user.username
        };
        jwt.sign(payload, secret.secretKey, { expiresIn: 3600 }, function(
          err,
          token
        ) {
          console.log(token);

          res.json({ success: true, token: "bearer " + token });
        });
      }
    });
  }
});

// @route     Get api/profile
// @desc      Profile User
// @access    Private
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const errors = {};
    Profile.findOne({ username: req.user.username })
      .then(profile => {
        if (!profile) {
          console.log(req.user.username);
          errors.noproile = "No User Found";
          return res.status(404).json(errors);
        }
        res.json(profile.message.reverse());
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

// @route     Get api/write
// @desc      Write User
// @access    Public
router.get("/write/:username", (req, res) => {
  var data = false;
  Profile.findOne({ username: req.params.username })
    .then(profile => {
      if (!profile) {
        return res.status(404).json(data);
      }
      res.json(!data);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// @route     Post api/write
// @desc      Write User
// @access    Public
router.post("/write/:username", (req, res, next) => {
  Profile.findOne({ username: req.params.username })
    .then(profile => {
      if (!profile) {
        return res.status(404).json(data);
      }
      profile.message.push({ comment: req.body.message, time: Date.now() });
      profile.save((err, save) => {
        if (err) return next(err);
        res.status(200).send("okk");
      });
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;
