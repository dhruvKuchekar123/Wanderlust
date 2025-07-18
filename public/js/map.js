
mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: coordinates,
  zoom: 10
});
console.log("Coordinates:", coordinates); // Debug log

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates)
  .addTo(map);
