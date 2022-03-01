const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();
router.get('/', isLoggedIn, (req, res) => {
    res.render('profile', {
        title: '정보수정',
        user: req.user,
        updateError: req.flash('updateError'),
    });
});