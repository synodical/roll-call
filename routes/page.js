const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models').User;
const Resident = require('../models').Resident;
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

router.get('/', async (req, res, next) => {
    if (!req.user) {
        res.render('main', {
            title: '점호',
            loginError: req.flash('loginError'),
        });
    } else {
        try {
            const residents = await Resident.findAll({
                order: [['room', 'ASC']],
                include: {
                    model: User,
                    where: { uid: req.user.uid },
                },
            });
            res.render('main', {
                title: '점호',
                user: req.user,
                residents: residents,
                loginError: req.flash('loginError'),
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
});
module.exports = router;