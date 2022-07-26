const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models").User;
const Resident = require("../models").Resident;
const router = express.Router();

router.get("/:id", isLoggedIn, (req, res) => {
  res.render("profile", { title: "프로필 조회", user: req.user });
});

router.delete("/:id", isLoggedIn, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  });
  Resident.destroy({
    where: {
      user_id: req.user.id,
    },
  })
    .then((result) => {
      return res.redirect(303, "/"); // redirect 안되네요... 고쳐야겠다...
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/:id", isLoggedIn, (req, res) => {
  User.update(
    { uid: req.body.uid, nick: req.body.nick, floor: req.body.floor },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/:id/list", isLoggedIn, async (req, res, next) => {
  try {
    const residents = await Resident.findAll({
      order: [["room", "ASC"]],
      include: {
        model: User,
        where: { uid: req.user.uid },
      },
    });
    res.render("main/edit-list.html", {
      title: "사생 목록",
      user: req.user,
      residents: residents,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/:id/list", isLoggedIn, async (req, res, next) => {
  const { room, name } = req.body;
  var id = req.params.id;
  try {
    await Resident.create({
      room: room,
      name: name,
      user_id: req.user.id,
    });
    return res.redirect(`/users/${id}/list`);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
