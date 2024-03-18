// function getNameFromAuth() {
//     firebase.auth().onAuthStateChanged(user => {
//         // Check if a user is signed in:
//         if (user) {
//             // Do something for the currently logged-in user here: 
//             console.log(user.uid); //print the uid in the browser console
//             console.log(user.displayName);  //print the user name in the browser console
//             userName = user.displayName;

//             //method #1:  insert with JS
//             document.getElementById("name-goes-here").innerText = userName;    

//             //method #2:  insert using jquery
//             //$("#name-goes-here").text(userName); //using jquery

//             //method #3:  insert using querySelector
//             //document.querySelector("#name-goes-here").innerText = userName

//         } else {
//             // No user is signed in.
//             console.log ("No user is logged in");
//         }
//     });
// }
// getNameFromAuth(); //run the function

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

function writeNews() {
    //define a variable for the collection you want to create in Firestore to populate data
    var newsRef = db.collection("news");

    newsRef.add({
        code: "NEWS01",
        name: "Test 1",
        country: "gb",
        level: "easy",
		details: "A lovely place for lunch walk",
        readTime: 3,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    newsRef.add({
        code: "NEWS02",
        name: "Test 2",
        country: "uk",
        details: "Placeholder for news article",
        readTime: 4,
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    newsRef.add({
        code: "NEWS03",
        name: "Test 3",
        country: "canada",
        details:  "Amazing ski slope views",
        readTime: 5,
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
}