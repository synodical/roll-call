const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models").User;
const Resident = require("../models").Resident;
const router = express.Router();

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
