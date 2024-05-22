const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// register new user
router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    });
    user.save();
    res
      .status(201)
      .json({
        message: "User created",
        user: user,
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

// login user
router.post('/login', (req, res) => {
  User.findOne({ email:req.body.email})
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Email Authentication failure",
        });
      }
      //compare to hashed password
      bcrypt.compare(req.body.password, user.password)
      .then((result) => {
        if(!result){
            return res.status(401).json({
                message: "Authentication failure: invalid email/password"
            });
        }
      })
      const token = jwt.sign(
        { email: user.email, userid: user._id }, "secret",
        { expiresIn: "1h" });

      res.status(200).json({ token:token });
    })
    .catch((err) => {
      return res.status(401).json({
        message: `Authentication Failure: ${err}`
      })
    });
});

module.exports = router;
