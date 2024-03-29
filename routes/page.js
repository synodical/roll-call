const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models").User;
const Resident = require("../models").Resident;
const router = express.Router();

router.get("/list", isLoggedIn, (req, res) => {
  res.render("main/edit-list.html", { title: "사생 목록", user: req.user });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", {
    title: "회원가입",
    user: req.user,
    joinError: req.flash("joinError"),
  });
});

router.get("/rollcall", isLoggedIn, async (req, res, next) => {
  try {
    const residents = await Resident.findAll({
      order: [["room", "ASC"]],
      include: {
        model: User,
        where: { uid: req.user.uid },
      },
    });
    res.render("main/resi-list", {
      title: "점호",
      user: req.user,
      residents: residents,
      loginError: req.flash("loginError"),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", {
    title: "회원가입",
    user: req.user,
    joinError: req.flash("joinError"),
  });
});

router.get("/how2use", isLoggedIn, (req, res) => {
  res.render("main/how2use.html", {
    title: "사용법",
    user: req.user,
  });
});

router.get("/board", isLoggedIn, (req, res) => {
  res.render("main/board.html", {
    title: "건의하기",
    user: req.user,
  });
});

router.post("/board", isLoggedIn, (req, res) => {});

router.get("/", async (req, res, next) => {
  res.render("main/main-page.html", {
    title: "점호",
    user: req.user,
    loginError: req.flash("loginError"),
  });
});

module.exports = router;
