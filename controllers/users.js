const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login =  async (req, res) => {
    req.flash("success", "Welcome to Wanderlust!");
    const redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
  };

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Goodbye!");
    res.redirect("/listings");
  });
}

const Listing = require("../models/listing");

module.exports.showProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  
  if (!user) {
    req.flash("error", "User not found.");
    return res.redirect("/listings");
  }

  const userListings = await Listing.find({ owner: id }).populate("reviews");
  
  res.render("users/profile.ejs", { profileUser: user, userListings });
};

module.exports.renderForgotForm = (req, res) => {
  res.render("users/forgot.ejs");
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.flash("error", "No account with that email address exists.");
      return res.redirect("/forgot");
    }

    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === "your_gmail@gmail.com") {
      req.flash("error", "Email system is not configured. Please check .env file.");
      return res.redirect("/forgot");
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetURL = `http://${req.headers.host}/reset/${token}`;

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Wanderlust Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
Please click on the following link, or paste this into your browser to complete the process:\n\n
${resetURL}\n\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    req.flash("success", "An e-mail has been sent to " + user.email + " with further instructions.");
    res.redirect("/forgot");
  } catch (err) {
    req.flash("error", "Error sending password reset email.");
    res.redirect("/forgot");
  }
};

module.exports.renderResetForm = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    req.flash("error", "Password reset token is invalid or has expired.");
    return res.redirect("/forgot");
  }

  res.render("users/reset.ejs", { token: req.params.token });
};

module.exports.resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      req.flash("error", "Password reset token is invalid or has expired.");
      return res.redirect("/forgot");
    }

    if (req.body.password !== req.body.confirmPassword) {
      req.flash("error", "Passwords do not match.");
      return res.redirect("back");
    }

    await user.setPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    req.login(user, (err) => {
      if (err) return next(err);
      req.flash("success", "Success! Your password has been changed.");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", "Error resetting password.");
    res.redirect("/forgot");
  }
};