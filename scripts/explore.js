const ACCESS_TOKEN = 'pk.eyJ1IjoiaXRzbWVqb2hub2giLCJhIjoiY2x0Z2F1MWpzMHprdTJsc2RpaTJ6b3l3dSJ9.5Ny3ulHEbHGmH7TecVua5w';

mapboxgl.accessToken = ACCESS_TOKEN;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-73.99209, 40.68933],
  zoom: 8.8
});

const searchJS = document.getElementById('search-js');
searchJS.onload = function () {
  const searchBox = new MapboxSearchBox();
  searchBox.accessToken = ACCESS_TOKEN;
  searchBox.options = {
    types: 'address,poi',
    proximity: [-73.99209, 40.68933]
  };
  searchBox.marker = true;
  searchBox.mapboxgl = mapboxgl;
  map.addControl(searchBox);
};