require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const MONGO_URL = process.env.ATLASDB_URL;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("MongoDB connected");
  await initDB();
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner: "6980ca79280d7d417fb48c41"}));
  await Listing.insertMany(initData.data);
  console.log("DB initialized with 100 properties!");
  process.exit(); // ensure the script closes properly
};
