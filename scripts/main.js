// $(document).ready(function () {
//     alert("Hello!");
//     $("#for-you-nav-link").addClass("active");
// });

// $(".nav-link").on("click", function(){
//     $(".nav-link").find(".active").removeClass("active");
//     $(this).addClass("active");
//     alert("Hello!");
//   });
  
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

// console.log(today);
// todayString = String(today);
// console.log(todayString);

// console.log(Date(todayString));


// Get date function
// function printDate() {
//     const currentDate = new Date();
//     console.log(currentDate);

//     const currentDayOfMonth = currentDate.getDate();
//     const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
//     const currentYear = currentDate.getFullYear();
    
//     const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
//     console.log("The date is: " + dateString);

//     // const timestamp = currentDate.getTime(); 
//     // console.log("The timestramp is: " + timestamp);
// }
// printDate();

// Get logged in user's ID, save it to local storage for future purposes
function saveUserIDToLocalStorage() {
    firebase.auth().onAuthStateChanged(user => {
        localStorage.setItem("userID", user.uid);
    })
}
saveUserIDToLocalStorage();

// Is it a new day?
localStorage.setItem("fetchedNewsForToday", "false");

// Use API to query news, then add to database
function fetchNewsFromAPI() {
    console.log("Entered function fetchNewsFromAPI");

    const userID = localStorage.getItem("userID");
    const userRef = db.collection("users").doc(userID);

    userRef.get()
        .then(user => {

        var country = user.data().country_preference;
        var category = user.data().category_preference;
        var articlesPerDay = user.data().articlesPerDay_preference;
        var from = "2024-03-17T00:00:00Z"; // This needs to be dynamically based based on the current date.

        console.log("Country read from database: " + country);
        console.log("Category read from database: " + category);
        console.log("articlesPerDay read from database: " + articlesPerDay);

        var url = `https://gnews.io/api/v4/top-headlines?category=${category}&country=${country}&max=${articlesPerDay}&from=${from}&apikey=${news_api_key}`;

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
                    });

                    // Save the newsID in the user's for_you array
                    userRef.update({
                        for_you: firebase.firestore.FieldValue.arrayUnion(title)
                    });
                }  
                
                displayCards();
                console.log("Successfully loaded cards for today.");

                userRef.update({
                    date_last_loaded: String(new Date())
                })
            })
        })
}

function loadNewsForToday() {
    const userID = localStorage.getItem("userID");
    const userRef = db.collection("users").doc(userID);

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
loadNewsForToday();

// if (localStorage.getItem("fetchedNewsForToday") == "false") {
//     console.log("ran function");
//     fetchNewsFromAPI();
// }

// Display news from database
function displayCards() {
    console.log("Entered function displayCards");

    const userID = localStorage.getItem("userID");
    const userRef = db.collection("users").doc(userID);

    let cardTemplate = document.getElementById("newsCardTemplate");

    userRef.get()
        .then(user => {
            var articlesToShow = user.data().for_you.length;

            for(let i = 0; i < articlesToShow; i++) {
                let forYouNewsID = user.data().for_you[i];

                db.collection("news").doc(forYouNewsID).get()
                    .then(article => {
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
            }
        })
}
displayCards();

// function writeNews() {
//     //define a variable for the collection you want to create in Firestore to populate data
//     var newsRef = db.collection("news");

//     newsRef.add({
//         code: "NEWS01",
//         name: "Test 1",
//         country: "gb",
//         level: "easy",
// 		details: "A lovely place for lunch walk",
//         readTime: 3,
//         last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
//     });
//     newsRef.add({
//         code: "NEWS02",
//         name: "Test 2",
//         country: "uk",
//         details: "Placeholder for news article",
//         readTime: 4,
//         last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
//     });
//     newsRef.add({
//         code: "NEWS03",
//         name: "Test 3",
//         country: "canada",
//         details:  "Amazing ski slope views",
//         readTime: 5,
//         last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
//     });
// }

