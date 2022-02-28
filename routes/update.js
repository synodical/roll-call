const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();
router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
        title: '정보수정',
        user: req.user,
        updateError: req.flash('updateError'),
    });
});