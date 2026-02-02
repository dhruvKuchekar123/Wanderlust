// =======================
// ENV CONFIG (ONLY ONCE)
// =======================
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// =======================
// IMPORTS
// =======================
const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// =======================
// ROUTES
// =======================
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// =======================
// DATABASE CONNECTION
// =======================
const dbUrl = process.env.ATLASDB_URL;

console.log("MONGO_URL =>", dbUrl);

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// =======================
// VIEW ENGINE
// =======================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

// =======================
// MIDDLEWARES
// =======================
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

// =======================
// SESSION STORE
// =======================
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Session Store Error:", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// =======================
// PASSPORT CONFIG
// =======================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =======================
// GLOBAL VARIABLES
// =======================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// =======================
// ROUTES
// =======================
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// =======================
// 404 HANDLER
// =======================
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});


// =======================
// ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error", { err });
});

// =======================
// SERVER
// =======================
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
