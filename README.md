# 🌍 Wanderlust

![Wanderlust Cover](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80)

> A modern, full-stack property listing and hotel booking platform built with Node.js, Express, and MongoDB.

### 🚀 Live Demo
**[👉 Click Here to View Live Project](https://wanderlust-2-49xs.onrender.com)** *(Note: Replace this URL with your exact Render web service URL if different)*

---

## 🌟 Key Features & Recent Updates

- **Premium Glassmorphic UI**: Completely redesigned authentication pages (Login, Signup, Forgot Password) using sleek, ultra-compact glassmorphic cards hovering over immersive, full-screen animated travel backgrounds.
- **Advanced Authentication & Google OAuth**: Seamless login/signup options. Users can register locally or instantly "Continue with Google".
- **OTP Verification & Password Recovery**: Automated email-based OTP (One Time Password) generation for secure password resets, powered by Nodemailer.
- **Multi-Method Mock Payment System**: A dynamic, interactive checkout UI featuring selectable tabs for:
  - **Credit/Debit Card**: Automatically detects Visa, Mastercard, and Amex brands as you type, and enforces strict mathematical Luhn validations.
  - **Google Pay (GPay)**: UPI-based interface.
  - **Net Banking**: Secure bank selection.
- **Automated Email Receipts**: Upon successful booking, the server instantly generates and emails a beautifully formatted HTML receipt to the user's registered inbox.
- **Strict Data Validations**: Robust server-side schema validation using `Joi` and client-side HTML5 pattern enforcements to prevent invalid data injections or random string submissions.
- **Fully Mobile Responsive**: Engineered with a "mobile-first" mindset. Features responsive clamp typography, `overflow-x: hidden` protections, and bottom navigation bars to ensure a flawless experience on smartphones.
- **Dynamic Image Sliders**: Premium 5-image carousels for property detail pages featuring touch-swipe, Ken Burns zoom, and pause-on-hover mechanics.
- **Interactive Maps**: Mapbox integration plots exactly where properties are located based on their GPS coordinates.
- **Dark Mode Support**: Seamless toggle between Light and Dark themes, with persistent state saving.

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6)
- EJS (Embedded JavaScript Templating)
- Bootstrap 5 (Customized)
- AOS (Animate On Scroll)
- Flatpickr (Date selection)

**Backend & Security:**
- Node.js & Express.js
- MongoDB & Mongoose
- Passport.js & `passport-google-oauth20`
- Joi (Server-side schema validation)
- Nodemailer (Email services)

**APIs & Cloud:**
- Cloudinary (Cloud image storage)
- Mapbox (Geocoding & Maps API)

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
   Create a `.env` file in the root directory and add the following required keys:
   ```env
   # Core Configurations
   SECRET=your_session_secret
   ATLASDB_URL=your_mongodb_atlas_url

   # Cloudinary (Image Uploads)
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret

   # Mapbox (Maps & Geocoding)
   MAP_TOKEN=your_mapbox_token

   # Google OAuth (Authentication)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Email Services (Nodemailer / OTP)
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
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
