const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../helpers/auth');


router.get('/', (req, res) => {
  res.render('home')
})

router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard')
})

module.exports = router
