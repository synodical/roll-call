const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models').User;
const router = express.Router();


router.get('/list', isLoggedIn, (req, res) => {
    res.render('list', { title: '사생 목록', user: req.user });
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
        title: '회원가입',
        user: req.user,
        joinError: req.flash('joinError'),
    });
});

router.get('/', (req, res, next) => {
    res.render('main', {
        title: '점호',
        user: req.user,
        loginError: req.flash('loginError'),
    });
});
module.exports = router;