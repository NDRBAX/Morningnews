var express = require("express");
const bcrypt = require("bcryptjs");
var router = express.Router();
var userModel = require("../models/users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
/* SIGNUP */
router.post("/sign-up", async function (req, res, next) {
  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
  });
  // Création du user s'il n'existe pas dans la BDD
  if (
    req.body.usernameFromFront == "" ||
    req.body.emailFromFront == "" ||
    req.body.passwordFromFront == ""
  ) {
    res.json({
      result: false,
      reason:
        "Vérifiez les informations saisies. Le nom et le mot de passe doivent contenir plus de caractères.",
    });
  } else if (searchUser) {
    res.json({
      result: false,
      reason: "L'utilisateur existe déja dans la base de données.",
    });
  } else if (!searchUser) {
    var newUser = new userModel({
      lastName: req.body.nameFromFront,
      firstName: req.body.firstNameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    });
    var newUserSave = await newUser.save();
    req.session.user = {
      lastName: newUserSave.lastName,
      id: newUserSave._id,
    };
    res.json({ result: true });
  }
});

/* SIGNIN */
router.post("/sign-in", async function (req, res, next) {
  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
  });
  if (searchUser != null) {
    const validPassword = await bcrypt.compare(
      req.body.passwordFromFront,
      searchUser.password
    );
    if (validPassword) {
      req.session.user = {
        lastName: searchUser.lastName,
        id: searchUser._id,
      };
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  }
});

/* LOGOUT */
// router.get("/logout", function (req, res, next) {
// //   req.session.destroy();
//   res.redirect("/");
// });

module.exports = router;
