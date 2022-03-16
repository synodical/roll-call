const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models').User;
const Resident = require('../models').Resident;
const router = express.Router();

router.get('/:id/list', isLoggedIn, async (req, res, next) => {
  try {
    const residents = await Resident.findAll({
      include: {
        model: User,
        where: { id: req.params.id }, //요청에서 라우트로 들어오는 id값
        order: [['room', 'ASC']],
      },
    });
    console.log(residents);
    res.render('list', {
      title: '사생 명단',
      user: req.user,
      residents
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/:id/list', isLoggedIn, async (req, res, next) => {
  const { room, name } = req.body;
  //console.log(req.params.id);
  var id = req.params.id;
  try {
    await Resident.create({
      room: room,
      name: name,
      user_id: req.user.uid,
    });
    return res.redirect(`/resident/${id}/list`);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;