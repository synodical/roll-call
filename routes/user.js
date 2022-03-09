// user router를 따로 만들어야하는가?
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models').User;
const router = express.Router();
router.get('/:id', isLoggedIn, (req, res) => {
  res.render('profile', { title: '프로필 조회', user: req.user });
});

router.post('/:id', isLoggedIn, (req, res) => {
  User.update({ email: req.body.email, nick: req.body.nick, floor: req.body.floor }, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    return res.redirect('/');
  }).catch(err => {
    console.log(err);
  })
});
module.exports = router;