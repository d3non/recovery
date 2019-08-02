const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('./auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/tables', ensureAuthenticated, (req, res) =>
  res.render('tables', {
    user: req.user
  })
);

module.exports = router;
