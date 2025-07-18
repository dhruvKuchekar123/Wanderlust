const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListings } = require("../middleware"); // ✅ fixed
const multer  = require('multer')
const {storage} = require("../cloudconfig.js")
const upload = multer({ storage })



const listingControllers = require("../controllers/listings.js");

router.
    route("/")
    .get(wrapAsync(listingControllers.index))
    .post(
        isLoggedIn,     
        upload.single('listing[image]'), 
         validateListings, 
        wrapAsync(listingControllers.createListing)
    );


router.get("/new", isLoggedIn, listingControllers.renderNewForm);

router.
    route("/:id")
   .get( wrapAsync(listingControllers.showListings))
   .put( 
        isLoggedIn, 
        isOwner,
        upload.single('listing[image]'), 
        validateListings, 
        wrapAsync(listingControllers.updateListing)
    )

   .delete( 
    isLoggedIn, 
    isOwner, 
    wrapAsync(listingControllers.deleteListing));


router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.editListing));

module.exports = router;
