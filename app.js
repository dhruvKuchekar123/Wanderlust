if(process.env.NODE_ENV != "production") {
   require("dotenv").config();
}

// require("dotenv").config();

// console.log("Cloud name:", process.env.CLOUD_NAME);
// console.log("API Key:", process.env.CLOUD_API_KEY);
// console.log("API Secret:", process.env.CLOUD_API_SECRET); // Optional, for debugging only. Don't log in production.



const express = require("express");
const app = express();
const ejsMate = require("ejs-mate"); // ✅ added
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");



const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const dbUrl = process.env.ATLASDB_URL;

mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.engine("ejs", ejsMate);          // ✅ added
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () =>{
  console.log("Session store error",err);
});

const sessionOptions = {
  store,
  secret:  process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
     expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
     maxAge: 7 * 24 * 60 * 60 * 1000,
     httpOnly: true,
  }
  
};


app.get("/", (req, res) => {
  res.redirect("/listings"); // or render a homepage
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   res.locals.currUser = req.user;
   next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "test@gmail.com",
//     username: "testuser",
//   });

//   let registeredUser = await User.register(fakeUser, "password123");
//   res.send(registeredUser);
// }); 

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// ✅ Fallback 404 Route (Express 5 compatible)
app.all("/*splat", (req, res, next) => {
  console.log("Unmatched route:", req.params.splat); // Optional: Log unmatched path
  next(new ExpressError(404, "Page Not Found!"));
});

// ✅ Error Handler Middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error", { err });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
