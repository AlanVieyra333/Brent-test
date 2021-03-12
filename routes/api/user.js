const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//  Load User model
const User = require("../../models/User");

//  @route  POST api/user/signup
//  @desc   Signup user
//  @access public
router.post("/signup",
  (req, res) => {

    const { name, email, password } = req.body;

    User.findOne({ email }).then(user => {
      if (user) {
        return res.status(400).json("Email already exists");
      }

      User.findOne({ name }).then(user => {
        if (user) {
          return res.status(400).json("Username already exists");
        }

        const newUser = new User({
          name,
          email,
          isadmin: false,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      })
    });
  });

//  @route  GET api/user/login
//  @desc   Login user / Returning JWT Token
//  @access Public
router.post("/login", (req, res) => {
  const { name, password } = req.body

  //  Find user by email
  User.findOne({ name }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json("User not found");
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched

        const payload = { id: user.id, name: user.name }; //  Creat JWT payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json("The password is incorrect");
      }
    });
  });
});

module.exports = router;