const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models').User;
const Resident = require('../models').Resident;
const router = express.Router();

router.get('/list', isLoggedIn, (req, res, next) => {
  Resident.findAll({
    
  })
});

module.exports = router;