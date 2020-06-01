const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('register', (req, res) => {
  res.render('register');
})

router.post('login', (req, res) => {
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

  }
})

module.exports = router;
