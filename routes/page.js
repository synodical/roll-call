const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models').User;
const router = express.Router();
router.get('/user/:id', isLoggedIn, (req, res) => {
    res.render('profile', { title: '프로필 조회', user: req.user });
});

router.post('/user/:id', isLoggedIn, (req, res) => {
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