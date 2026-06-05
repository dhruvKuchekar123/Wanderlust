const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// =======================
// SHOW ALL LISTINGS
// =======================
module.exports.index = async (req, res) => {
  let { q, category, page } = req.query;
  const limit = 9; // listings per page
  page = parseInt(page) || 1;
  const skip = (page - 1) * limit;

  let query = {};
  if (q) {
    query = {
      $or: [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { country: { $regex: q, $options: "i" } }
      ]
    };
  } else if (category) {
    query.category = category;
  }

  const allListings = await Listing.find(query)
    .populate("reviews")
    .skip(skip)
    .limit(limit);

  const totalListings = await Listing.countDocuments(query);
  const totalPages = Math.ceil(totalListings / limit);

  res.render("listings/index.ejs", { 
    allListings, 
    searchQuery: q, 
    currentCategory: category,
    currentPage: page,
    totalPages
  });
};

// =======================
// NEW LISTING FORM
// =======================
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// =======================
// SHOW SINGLE LISTING
// =======================
module.exports.showListings = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found or already deleted.");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// =======================
// CREATE LISTING
// =======================
module.exports.createListing = async (req, res) => {
  const response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const url = req.file.path;
  const filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;

  await newListing.save();

  req.flash("success", "Listing created successfully!");
  res.redirect("/listings");
};

// =======================
// EDIT FORM
// =======================
module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found or already deleted.");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// =======================
// UPDATE LISTING
// =======================
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (req.file) {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

// =======================
// DELETE LISTING
// =======================
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
};
