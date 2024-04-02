const ACCESS_TOKEN = 'pk.eyJ1IjoiaXRzbWVqb2hub2giLCJhIjoiY2x0Z2F1MWpzMHprdTJsc2RpaTJ6b3l3dSJ9.5Ny3ulHEbHGmH7TecVua5w';

mapboxgl.accessToken = ACCESS_TOKEN;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/itsmejohnoh/clu8oqvhn00ba01ra9a6t9hcj',
  center: [-105, 55],
  zoom: 3
});

const countryCode = ['US', 'CA', 'AU', 'BR', 'CN', 'FR', 'EG', 'DE', 'GR', 'HK', 'IN', 'IE', 'IL', 'IT', 'JP', 'NL', 'NO', 'PK', 'PE', 'ph', 'pt', 'ro', 'ru', 'sg', 'es', 'se', 'ch', 'tw', 'ua', 'gb'];

rollRandom();
console.log(selected);

var country_description;

map.on('load', () => {
  /*
  for (let i = 0; i < 3; i++) {
    switch (selected.pop) {
      case 0:
        map.addSource('places', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    'us',
                  'icon': 'globe',
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-98, 38.931567]
                }
              }
            ]
          }
        })
      case 1:
        map.addSource('places', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    'cn',
                  'icon': 'globe',
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [104.2, 35.9]
                }
              }
            ]
          }
        })
      case 2:
        map.addSource('places', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    'ca',
                  'icon': 'globe',
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-106.35, 56.13]
                }
              }
            ]
          }
        })
      case 3:
        map.addSource('places', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    'au',
                  'icon': 'globe',
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [133.78, -25.3]
                }
              }
            ]
          }
        })
      case 4:
        map.addSource('places', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    'br',
                  'icon': 'globe',
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-51.9, -14.24]
                }
              }
            ]
          }
        })
      case 5:
        map.addSource('places', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    'fr',
                  'icon': 'globe',
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [2.21, 46.23]
                }
              }
            ]
          }
        })
    }
  }*/

  
  map.addSource('places', {
    // This GeoJSON contains features that include an "icon"
    // property. The value of the "icon" property corresponds
    // to an image in the Mapbox Streets style's sprite.
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'description':
              'us',
            'icon': 'globe',
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-98, 38.931567]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              'cn',
            'icon': 'globe',
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [104.2, 35.9]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              'ca',
            'icon': 'globe',
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-106.35, 56.13]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              'au',
            'icon': 'globe',
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [133.78, -25.3]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              'br',
            'icon': 'globe',
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-51.9, -14.24]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              'fr',
            'icon': 'globe',
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [2.21, 46.23]
          }
        }
      ]
    }
  });

  // Add a layer showing the places.
  map.addLayer({
    'id': 'places',
    'type': 'symbol',
    'source': 'places',
    'layout': {
      'icon-image': ['get', 'icon'],
      'icon-size': 2.5,
      'icon-allow-overlap': true
    }
  });

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on('click', 'places', (e) => {
    // Copy coordinates array.
    country_description = e.features[0].properties.description;
    console.log(country_description);
    fetchNewsFromAPI();
    const elem = document.getElementById("explore-cards-go-here");
    console.log(elem.childNodes.length);
    if (elem.childNodes.length > 0) {
      document.querySelector("#explore-cards-go-here").innerHTML = "";
      console.log(elem.childNodes.length);
    }
    displayCards();
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'places', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'places', () => {
    map.getCanvas().style.cursor = '';
  });
});



// Use API to query news, then add to database
function fetchNewsFromAPI(i) {
  const userID = localStorage.getItem("userID");
  const userRef = db.collection("users").doc(userID);

  userRef.get()
    .then(user => {
      var country = country_description;
      var category = user.data().category_preference;
      var articlesPerDay = user.data().articlesPerDay_preference;
      var from = "2024-03-17T00:00:00Z";
      var news_api_key = 'ee6cc9b236a42b299ddb195f1bbe79d7';

      var url = `https://gnews.io/api/v4/top-headlines?category=${category}&country=${country}&max=${articlesPerDay}&from=${from}&apikey=${news_api_key}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          var articles = data.articles;
          console.log(articles);
          //console.log("length:" + articles.length);

          numberOfArticles = articles.length;

          for (let i = 0; i < numberOfArticles; i++) {
            // Write each article into database, with ID = title
            var title = articles[i].title;

            db.collection("world").doc(title).set({
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

function fetchNews() {
  for (let i = 0; i < 6; i++) {
    fetchNewsFromAPI(i);
    console.log(i);
  }
}

function loadNewsForToday() {
  userRef.get()
    .then(user => {
      console.log("Date read from database: " + user.data().date_last_loaded);

      var dateLastLoaded = new Date(user.data().date_last_loaded);
      console.log(dateLastLoaded);

      var dateToday = new Date("March 22, 2024")
      console.log("Date today: " + dateToday);

      console.log(dateLastLoaded.getDate() > dateToday.getDate());
      if (dateToday > dateLastLoaded) {
        console.log("We need to fetch news for today.");
        fetchNewsFromAPI();
      } else {
        console.log("Today's cards are already fetched.");
      }
    })
}

// Display news from database
function displayCards() {
  let cardTemplate = document.getElementById("newsCardTemplate");

  db.collection("world").get()
    .then(articles => {
      articles.forEach(article => {

        if (article.data().country.includes(country_description)) {
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
        }

      })
    })
}

var rand = 0;
var selected;
function rollRandom() {
  n = 3;
  array = [0, 1, 2, 3, 4, 5];
  var shuffled = array.sort(function () { return 0.5 - Math.random() });
  selected = shuffled.slice(0, n);
  console.log(selected);

}

