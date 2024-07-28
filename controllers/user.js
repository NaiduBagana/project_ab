let User = require("../models/user.js")
module.exports.signupRenderForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({
      email: email,
      username: username,
    });
    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
    //   req.flash("success", "New User Registered Successfully");

    //   console.log(registeredUser);
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.loginRenderForm = (req, res) => {
  res.render("users/login.ejs");
};
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  let redirectUrl;
  if (res.locals.redirectUrl) {
    redirectUrl = res.locals.redirectUrl;
  } else {
    redirectUrl = "/listings";
  }
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You logged out successfully!");
    res.redirect("/listings");
  });
};