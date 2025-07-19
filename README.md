🌍 Wanderlust – Property Listing Web App
Wanderlust is a full-stack web application that allows users to create, explore, and review property listings. Inspired by platforms like Airbnb, the app includes secure authentication, dynamic map integration, cloud-based image uploads, and more—deployed fully on the cloud.

🔗 Live Demo
🚀 Click here to visit Wanderlust on Render
(Replace with your actual deployed link)

📌 Features
🧾 User Authentication – Secure sign-up/login using Passport.js.

🏘️ Property Listings – Add properties with title, description, price, location, country, and images.

🗺️ Map Integration – View listing locations using Mapbox geocoding & interactive maps.

📸 Image Uploads – Upload multiple images via Multer and store them on Cloudinary.

✍️ Review System – Leave reviews and ratings on properties.

✅ Validation & Middleware – Uses Joi for form validation and custom middleware for route protection.

💬 Flash Messages – Get real-time feedback on actions like login, logout, and listing updates.

☁️ Cloud Deployment – Backend hosted on Render, DB hosted on MongoDB Atlas.

🛠️ Tech Stack
Layer	Technology
Frontend	EJS, Bootstrap, HTML, CSS, JS
Backend	Node.js, Express.js
Database	MongoDB Atlas
Auth	Passport.js, express-session
File Upload	Multer, Cloudinary
Maps	Mapbox SDK
Deployment	Render


Folder Structure:
MyProject/
│
├── models/           # Mongoose models (Listing, Review, User)
├── routes/           # Express route files
├── controllers/      # Route logic handlers
├── views/            # EJS templates
├── public/           # Static assets (CSS, JS, images)
├── uploads/          # Temp uploads (if applicable)
├── middleware.js     # Custom middleware (auth, validation)
├── schema.js         # Joi validation schemas
├── app.js            # Main server file
└── cloudconfig.js    # Cloudinary config

🧠 Lessons Learned
Built a modular and scalable Node.js/Express application.

Implemented cloud-based image hosting and DB integration.

Gained experience with backend validation, route protection, and secure deployment.

Learned to handle user sessions, file uploads, and interactive geolocation.


📜 License
MIT License
