const express = require('express');
//const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();
router.get('/profile', (req, res) => {
    res.render('profile', { title: '내 정보', user: null });
});
router.get('/join', (req, res) => {
    res.render('join', {
        title: '회원가입',
        user: null,
        joinError: req.flash('joinError'),
    });
});
router.get('/', (req, res, next) => {
    res.render('main', {
        titie: '점호',
        user: null,
        loginError: req.flash('loginError'),
    });
});
module.exports = router;