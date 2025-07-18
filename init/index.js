const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js"); // assuming your seed data is in data.js

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // replace with your Mongo URL

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("MongoDB connected");
  await initDB();
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data =  initData.data.map((obj) => ({...obj, owner: "6873d8c9af9d69add793999d"}));
  await Listing.insertMany(initData.data);
  console.log("DB initialized");
};

initDB();
