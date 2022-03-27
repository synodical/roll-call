const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models").User;
const Resident = require("../models").Resident;
const router = express.Router();

router.get("/:id/list", isLoggedIn, async (req, res, next) => {
  try {
    const residents = await Resident.findAll({
      order: [["room", "ASC"]],
      include: {
        model: User,
        where: { uid: req.user.uid },
      },
    });
    console.log(residents);
    res.render("list", {
      title: "사생 명단",
      user: req.user,
      residents: residents,
    });
  } catch (err) {
    console.log(err);
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
    return res.redirect(`/resident/${id}/list`);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.route("/:id").delete(async (req, res, next) => {
  try {
    const result = await Resident.destroy({ where: { id: req.params.id } });
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
module.exports = router;
