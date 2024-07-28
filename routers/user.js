const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const userController = require("../controllers/user.js");
const { saveRedirectUrl } = require("../middleware.js");
//signup
router
  .route("/signup")
  .get(userController.signupRenderForm)
  .post(wrapAsync(userController.signup));

//login
router
  .route("/login")
  .get(userController.loginRenderForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login" }),
    userController.login
  );

//logout
router.get("/logout", userController.logout);

module.exports = router;
