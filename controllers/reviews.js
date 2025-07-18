const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    const { id } = req.params;

    // 1. Find the listing
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();

    req.flash("success", "New Review created!");
    res.redirect(`/listings/${id}`);
  };

  module.exports.deleteReview = async (req, res) => {
      const { id, reviewId } = req.params;
      await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
  
      req.flash("success", "Review deleted.");
      res.redirect(`/listings/${id}`);
    };