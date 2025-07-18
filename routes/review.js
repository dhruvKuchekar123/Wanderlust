const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const reviewController = require("../controllers/reviews.js");

// ✅ Create Review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// ✅ Delete Review
router.delete(
  "/:reviewId",
  isReviewAuthor,
  isLoggedIn,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
