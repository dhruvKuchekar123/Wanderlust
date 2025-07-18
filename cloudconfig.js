const cloudinary = require('cloudinary').v2; // use `.v2` to access modern API
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// ✅ Proper configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,      // fixed typo: COLUD_NAME → CLOUD_NAME
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ Proper storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowed_formats: ['jpg', 'jpeg', 'png'], // fixed typo: allowerdFormats → allowed_formats
  },
});

module.exports = {
  cloudinary,
  storage,
};
