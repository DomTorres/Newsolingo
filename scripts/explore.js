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

// Use API to query news, then add to database
function fetchNewsFromAPI() {
  var category = "general";
  var country = "gb";
  var max = "10";
  var from = "2024-03-17T00:00:00Z";

  url = `https://gnews.io/api/v4/top-headlines?category=${category}&country=${country}&max=${max}&from=${from}&apikey=${news_api_key}`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          var articles = data.articles;
          console.log(articles);
          console.log("length:" + articles.length);

          numberOfArticles = articles.length;

          for(let i = 0; i < numberOfArticles; i++) {
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
              document.getElementById("for-you-cards-go-here").appendChild(newcard);
          })
      })
}
displayCards();