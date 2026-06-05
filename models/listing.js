const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  category: {
    type: String,
    enum: ["Beachfront", "Cabins", "OMG!", "Tiny Homes", "Camping", "Lakefront", "Desert", "Urban", "Hiking", "Hotel", "Arctic", "Historical", "Pools", "Pet Friendly", "Tropical", "Yurts", "Boats", "Futuristic", "Luxury", "Other"],
    default: "Other"
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
}
});

listingSchema.post("/findOneAndDelete", async (listing) => {
  if(listing) {
     await Review.deleteMany({_id: {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;