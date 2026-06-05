# 🌍 Wanderlust

![Wanderlust Cover](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80)

> A modern, full-stack property listing and hotel booking platform built with Node.js, Express, and MongoDB.

### 🚀 Live Demo
**[👉 Click Here to View Live Project](https://wanderlust-app.onrender.com)** *(Note: Replace this URL with your exact Render web service URL)*

---

## 🌟 Features

- **Beautiful UI/UX**: Premium Airbnb-style design with smooth scrolling animations, glassmorphism elements, and fully responsive layouts.
- **Dark Mode Support**: Seamless toggle between Light and Dark themes, with persistent state saving.
- **Dynamic Image Sliders**: Premium 5-image carousels for property detail pages featuring touch-swipe, Ken Burns zoom, and pause-on-hover mechanics.
- **Mapbox Integration**: Interactive global maps plotting exactly where properties are located based on their GPS coordinates.
- **Advanced Authentication**: Secure user registration, login, and session management using `passport-local-mongoose`.
- **Property Management**: Users can create, edit, and delete their own property listings. Features Cloudinary integration for image uploads.
- **Review System**: Users can leave 1-5 star ratings and written reviews on properties.
- **Mock Payment Flow**: Clean modal checkout system featuring a beautiful, animated CSS success overlay and receipt notification.
- **Massive Database**: Comes pre-seeded with 100+ unique properties spanning 20 different categories (Beachfront, Cabins, Mansions, etc.).

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6)
- EJS (Embedded JavaScript Templating)
- Bootstrap 5
- AOS (Animate On Scroll)
- Flatpickr (Date selection)
- SweetAlert2 / Custom Animated Modals

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Passport.js (Authentication)
- Cloudinary (Cloud image storage)
- Mapbox (Geocoding & Maps API)
- Joi (Server-side data validation)

---

## 💻 Local Installation

To run this project on your local machine, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhruvKuchekar123/Wanderlust.git
   cd Wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add the following keys:
   ```env
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_token
   ATLASDB_URL=your_mongodb_atlas_url
   SECRET=your_session_secret
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **View in Browser**
   Open `http://localhost:3000`

---

## 👨‍💻 Author

**Dhruv Kuchekar**
- GitHub: [@dhruvKuchekar123](https://github.com/dhruvKuchekar123)
- LinkedIn: [Dhruv Kuchekar](https://www.linkedin.com/in/dhruv-kuchekar-9601501b1/)
- Instagram: [@dhruv.kuchekar](https://www.instagram.com/dhruv.kuchekar/)
