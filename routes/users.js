const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/User.js');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = []

  if (!name || !email || !password || !password2) {
    errors.push({msg: 'Please fill all fields'});
  };

  if (password !== password2) {
    errors.push({msg: 'Passwords must match'});
  };

  if (password.length < 8) {
    errors.push({msg: 'Password must be at least 8 characters' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({email: email})
      .then(user => {
        if (user) {
          errors.push({msg: 'Email already registered'});
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err))
            });
          });
        }
      })
  };
})

module.exports = router;
