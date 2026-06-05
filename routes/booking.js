const express = require("express");
const router = express.Router({ mergeParams: true });
const bookingController = require("../controllers/bookings.js");
const { isLoggedIn } = require("../middleware.js");

// POST: Create a mock booking & send receipt
router.post("/", isLoggedIn, bookingController.createBooking);

module.exports = router;
