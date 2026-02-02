const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");

const userController = require("../controllers/users.js");

// GET: Signup Form
router.get("/signup", userController.renderSignupForm);

// POST: Handle Signup
router.post("/signup", wrapAsync(userController.signup));

// GET: Login Form
router.get("/login", userController.renderLoginForm);

// POST: Handle Login
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

// GET: Logout
router.get("/logout", userController.logout);

module.exports = router;
