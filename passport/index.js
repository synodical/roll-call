const passport = require("passport");
const local = require("./localStrategy");
//const kakao = require('./kakaoStrategy');
const User = require("../models").User;

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("here you serialize");
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("here you deserialize");
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  // kakao();
};
