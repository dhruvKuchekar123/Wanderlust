const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl, isLoggedIn, validateUser } = require("../middleware.js");

const userController = require("../controllers/users.js");

// GET: Signup Form
router.get("/signup", userController.renderSignupForm);

// POST: Handle Signup
router.post("/signup", validateUser, wrapAsync(userController.signup));

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

// GET: User Profile
router.get("/users/:id", isLoggedIn, userController.showProfile);

router.route("/forgot")
  .get(userController.renderForgotForm)
  .post(userController.forgotPassword);

router.route("/reset/:token")
  .get(userController.renderResetForm)
  .post(userController.resetPassword);

// GET: Google Auth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// GET: Google Auth Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", failureFlash: true }),
  userController.googleCallback
);

// GET/POST: Verify OTP
router.route("/auth/verify-otp")
  .get(userController.renderVerifyOtp)
  .post(userController.verifyOtp);

module.exports = router;
