var express = require("express");
const bcrypt = require("bcryptjs");
var router = express.Router();
var userModel = require("../models/users");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.redirect("/sign-up");
// });
/* SIGNUP */
router.post("/sign-up", async function (req, res, next) {
  var error = [];
  var result = false;
  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (
    req.body.usernameFromFront == "" ||
    req.body.emailFromFront == "" ||
    req.body.passwordFromFront == ""
  ) {
    error.push("champs vides");
  }

  if (searchUser) {
    error.push("utilisateur déjà présent");
  }

  if (!searchUser && error.length == 0) {
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    });
    var newUserSave = await newUser.save();
    // req.session.user = {
    //   lastName: newUserSave.lastName,
    //   id: newUserSave._id,
    if (newUserSave) {
      result = true;
    }
  }
  res.json({ result, newUserSave, error });
});

/* SIGNIN */
router.post("/sign-in", async function (req, res, next) {
  var result = false;
  var error = [];
  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("champs vides");
  }

  if (searchUser != null && error.length == 0) {
    const validPassword = await bcrypt.compare(
      req.body.passwordFromFront,
      searchUser.password
    );
    if (validPassword && searchUser) {
      result = true;
    } else {
      error.push("email ou mot de passe incorrect");
    }
  }

  res.json({ result, searchUser, error });
});

/* LOGOUT */
// router.get("/logout", function (req, res, next) {
// //   req.session.destroy();
//   res.redirect("/");
// });

module.exports = router;
