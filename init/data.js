const categories = [
  "Beachfront", "Cabins", "OMG!", "Tiny Homes", "Camping", "Lakefront", 
  "Desert", "Urban", "Hiking", "Hotel", "Arctic", "Historical", "Pools", 
  "Pet Friendly", "Tropical", "Yurts", "Boats", "Futuristic", "Luxury", "Other"
];

const baseImages = [
  "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"
];

const adjectives = ["Luxurious", "Cozy", "Secluded", "Modern", "Historic", "Stunning", "Peaceful", "Beautiful", "Breathtaking", "Charming"];

const locations = [
  { location: "Malibu", country: "United States", coords: [-118.7798, 34.0259] },
  { location: "Florence", country: "Italy", coords: [11.2558, 43.7696] },
  { location: "Bali", country: "Indonesia", coords: [115.1889, -8.4095] },
  { location: "Aspen", country: "United States", coords: [-106.8175, 39.1911] },
  { location: "Dubai", country: "United Arab Emirates", coords: [55.2708, 25.2048] },
  { location: "Kyoto", country: "Japan", coords: [135.7681, 35.0116] },
  { location: "Cape Town", country: "South Africa", coords: [18.4232, -33.9249] },
  { location: "Santorini", country: "Greece", coords: [25.4615, 36.3932] },
  { location: "Reykjavik", country: "Iceland", coords: [-21.9426, 64.1466] },
  { location: "Banff", country: "Canada", coords: [-115.5708, 51.1784] }
];

const sampleListings = [];

categories.forEach((cat, index) => {
  for (let i = 0; i < 5; i++) {
    const loc = locations[(index + i) % locations.length];
    const adj = adjectives[(index + i) % adjectives.length];
    const img = baseImages[i % baseImages.length];
    
    sampleListings.push({
      title: `${adj} ${cat} Escape`,
      description: `Experience the best of ${cat} in this ${adj.toLowerCase()} property located in ${loc.location}. Perfect for your next vacation, featuring world-class amenities, stunning views, and unmatched comfort. Book your stay today and create unforgettable memories.`,
      image: {
        filename: "listingimage",
        url: img,
      },
      price: 1000 + (i * 800) + Math.floor(Math.random() * 500),
      location: loc.location,
      country: loc.country,
      category: cat,
      geometry: {
        type: "Point",
        coordinates: loc.coords
      }
    });
  }
});

module.exports = { data: sampleListings };