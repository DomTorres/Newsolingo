const ACCESS_TOKEN = 'pk.eyJ1IjoiaXRzbWVqb2hub2giLCJhIjoiY2x0Z2FqaDlzMHpidjJqcDExdzdoeDFsbyJ9.sQU-GmRn0xonsYqFDBAZnw';

mapboxgl.accessToken = ACCESS_TOKEN;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/itsmejohnoh/clu8oqvhn00ba01ra9a6t9hcj',
  center: [-105, 55],
  zoom: 3
});

const searchJS = document.getElementById('search-js');
searchJS.onload = function () {
  const searchBox = new MapboxSearchBox();
  searchBox.accessToken = ACCESS_TOKEN;
  searchBox.options = {
    types: 'country',
    country: ['US', 'CA', 'AU', 'BR', 'CN', 'EG', 'FR', 'DE', 'GR', 'HK', 'IN', 'IE', 'IL', 'IT', 'JP', 'NL', 'NO', 'PK', 'PE', 'ph', 'pt', 'ro', 'ru', 'sg', 'es', 'se', 'ch', 'tw', 'ua', 'gb'],
    proximity: [-73.99209, 40.68933]
  };
  searchBox.marker = true;
  searchBox.mapboxgl = mapboxgl;
  map.addControl(searchBox);

  searchBox.addEventListener('retrieve', (event) => {
    const featureCollection = event.detail;
    console.log("Event: " + event);
    console.log("Event detail: " + featureCollection);
  })
};

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-98, 41]
      },
      properties: {
        title: 'Mapbox',
        description: 'us'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'cn'
      }
    }
  ]
};

// add markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
}

new mapboxgl.Marker(el)
  .setLngLat(feature.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
      )
  )
  .addTo(map);

  map.on('click', 'places', (e) => {
    const country_description = e.features[0].properties.description;
    console.log(country_description);
  })
  
// Use API to query news, then add to database
function fetchNewsFromAPI() {
  const userID = localStorage.getItem("userID");
    const userRef = db.collection("users").doc(userID);

    userRef.get()
        .then(user => {

        var country = country_description;
        var category = user.data().category_preference;
        var articlesPerDay = user.data().articlesPerDay_preference;
        var from = "2024-03-17T00:00:00Z";

  var url = `https://gnews.io/api/v4/top-headlines?category=${category}&country=${country}&max=${max}&from=${from}&apikey=${news_api_key}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var articles = data.articles;
      console.log(articles);
      console.log("length:" + articles.length);

      numberOfArticles = articles.length;

      for (let i = 0; i < numberOfArticles; i++) {
        // Write each article into database, with ID = title
        var title = articles[i].title;

        db.collection("news").doc(title).set({
          description: articles[i].description,
          content: articles[i].content,
          url: articles[i].url,
          image: articles[i].image,
          publishedAt: articles[i].publishedAt,
          category: category,
          country: country
        })
      }
    })
  })    
}
fetchNewsFromAPI();

// Display news from database
function displayCards() {
  let cardTemplate = document.getElementById("newsCardTemplate");

  db.collection("news").get()
    .then(articles => {
      articles.forEach(article => {
        // Clone template card
        let newcard = cardTemplate.content.cloneNode(true);

        // Set card details
        newcard.querySelector('.card-img').setAttribute("src", article.data().image);
        newcard.querySelector('.headline').innerHTML = article.id;
        newcard.querySelector('.preview').innerHTML = article.data().description;
        // newcard.querySelector('.time-to-read').innerHTML = time_to_read + " minute read";
        newcard.querySelector('.country').innerHTML = article.data().country;

        // Set card hyperlink
        newcard.querySelector("a").href = "article.html?articleID=" + article.id;

        // Add card to DOM
        document.getElementById("explore-cards-go-here").appendChild(newcard);
      })
    })
}
displayCards();

