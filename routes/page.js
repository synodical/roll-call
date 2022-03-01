const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();
router.get('/user/:id', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 수정', user: req.user });
});
router.put('/user/:id', isLoggedIn, (req, res) => {
    return data.update({
        email: req.body.email,
        nick: req.body.nick,
        floor: req.body.floor,
    }).then(function (data) {
        if (data) {
            res.send(data)
        } else {
            res.status(400).send('Error')
        }
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
        titie: '점호',
        user: req.user,
        loginError: req.flash('loginError'),
    });
});
module.exports = router;