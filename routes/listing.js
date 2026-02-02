const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListings } = require("../middleware");

const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

const listingControllers = require("../controllers/listings.js");

// =======================
// /listings
// =======================
router
  .route("/")
  .get(wrapAsync(listingControllers.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListings,
    wrapAsync(listingControllers.createListing)
  );

// =======================
// NEW LISTING FORM
// =======================
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

// =======================
// /listings/:id
// =======================
router
  .route("/:id")
  .get(wrapAsync(listingControllers.showListings))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListings,
    wrapAsync(listingControllers.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingControllers.deleteListing)
  );

// =======================
// EDIT FORM
// =======================
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.editListing)
);

module.exports = router;
