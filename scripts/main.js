// $(document).ready(function () {
//     alert("Hello!");
//     $("#for-you-nav-link").addClass("active");
// });

// $(".nav-link").on("click", function(){
//     $(".nav-link").find(".active").removeClass("active");
//     $(this).addClass("active");
//     alert("Hello!");
//   });

/**
 * TO DO:
 * 
 * Delete all articles if it's a new day. 
 * Use the date today to query from API.      DONE!
 * Initialize date to date - 1.               DONE!
 * Fix progress statuses.                     DONE!
 */

// Constants (we do not need to retrieve this after EVERY page load, just once per day.)
var userID;
var userRef;

// var articlesPerDay_preference = localStorage.getItem("articlesPerDay_preference");
// var category_preference = localStorage.getItem("category_preference");
// var country_preference = localStorage.getItem("country_preference");

var articlesPerDay_preference;
var category_preference;
var country_preference;

// Driver function
// function doAll() {
//     isNewDay();
// }
// doAll();

// Get logged in user's ID, save it to local storage for future purposes.
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("Logged in");
        console.log(user.displayName);
        console.log(user.firstName);

        userID = user.uid;
        console.log(userID);

        userRef = db.collection("users").doc(userID);
        console.log(userRef);

        // localStorage.setItem("userID", user.uid);
        console.log("Saved auto userID to local storage.");

        // call function isNewDay
        isNewDay();

        // call function loadDailyProgress
        loadDailyProgress();

    } else {
        console.log("No user is signed in.");
    }
});

// Determine if today is a new day.
function isNewDay() {
    console.log("Entered function isNewDay.");

    userRef.get()
        .then(user => {
            console.log("Date read from database: " + user.data().date_last_loaded);

            var dateLastLoaded = new Date(user.data().date_last_loaded);
            console.log("Date last loaded: " + dateLastLoaded);

            var dateToday = new Date(); // ACTUAL CODE
            // var dateToday = new Date("Mar 04, 2024") // CODE FOR TESTING PURPOSES
            console.log("Date today: " + dateToday);

            console.log("Is today AFTER the day last loaded? " + (dateToday.getDate() > dateLastLoaded.getDate()));
            if (dateToday.getDate() > dateLastLoaded.getDate()) {
                console.log("It is a new day, we need to fetch data.");

                saveUserDataToLocalStorage().then(() => {
                    fetchNewsFromAPI();
                });
            } else {
                console.log("It is not a new day, we do not need to fetch data.");
                
                displayCards();
            }
        }) 
}

// Get user's preference, save it to local storage for future purposes.
async function saveUserDataToLocalStorage() {
    console.log("Entered function saveUserDataToLocalStorage.");

    userRef.get().then((user) => {
        if (user.exists) {
            articlesPerDay_preference = user.data().articlesPerDay_preference;
            // localStorage.setItem("articlesPerDay_preference", articlesPerDay_preference);
            console.log("Saved articlesPerDay_preference: " + articlesPerDay_preference);

            category_preference = user.data().category_preference;
            // localStorage.setItem("category_preference", category_preference);
            console.log("Saved category_preference: " + category_preference);

            country_preference = user.data().country_preference;
            // localStorage.setItem("country_preference", country_preference);
            console.log("Saved country_preference: " + country_preference);

        } else {
            console.log("Error retrieving user data.");
        }
    });
}

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

/**
 * This function is intended to run only ONCE per day, at the user's first load on that day. 
 */
async function fetchNewsFromAPI() {
    console.log("Entered function fetchNewsFromAPI");

    // delete existing articles in the "for you" collection first
    // userRef.collection("for_you").get().then()

    // if user didn't complete yesterday's goal, set streak to 0
    userRef.get()
        .then(user => {
            if (Number(user.data().articlesPerDay_preference) != Number(user.data().articles_read_today)) {
                userRef.update({
                    streak: 0
                })
            }
        })

    // reset user's number of articles read today
    userRef.update({
        articles_read_today: 0
    })

    // fetch news from API
    userRef.get().then(user => {
        var from = "2024-03-17T00:00:00Z"; // This needs to be dynamically based based on the current date.

        today = new Date();
        to = today.toISOString();
        console.log(to);

        today.setDate(today.getDate() - 1);
        from = today.toISOString();
        console.log(from);

        var url = `https://gnews.io/api/v4/top-headlines?category=${category_preference}&country=${country_preference}&max=${articlesPerDay_preference}&from=${from}&to=${to}&apikey=${news_api_key}`;

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                console.log("Articles were successfully fetched.");
                var articles = jsonResponse.articles;

                for(let i = 0; i < articles.length; i++) {                    

                    // Write each article into the database
                    userRef.collection("for_you").add({
                        title: articles[i].title,
                        description: articles[i].description,
                        content: articles[i].content,
                        // url: articles[i].url,
                        image: articles[i].image,
                        publishedAt: articles[i].publishedAt,
                        // sourceName: articles[i].source.name,
                        // sourceURL: articles[i].source.url

                        country: country_preference,
                        category: category_preference
                    });
                }  

                console.log("Articles were successfully written into the database.");

                // Set date last loaded to today
                updateDateLastLoaded();

                // Display cards
                displayCards();
            })
        })
}

async function updateDateLastLoaded() {
    console.log("Entered function updateDateLastLoaded");

    userRef.update({
        date_last_loaded: String(new Date()) // ACTUAL CODE
        // date_last_loaded: String(new Date("Mar 03, 2024")), // CODE FOR TESTING PURPOSES
    });

    console.log("Succesfully updated date last loaded to today.")
}

// Display news from database
async function displayCards() {
    console.log("Entered function displayCards.");

    let cardTemplate = document.getElementById("newsCardTemplate");

    userRef.collection("for_you").get()
        .then(query => {
            query.forEach(article => {
                // Clone template card
                let newcard = cardTemplate.content.cloneNode(true);

                // Set card details
                newcard.querySelector('.card-img').setAttribute("src", article.data().image);
                newcard.querySelector('.headline').innerHTML = article.data().title;
                newcard.querySelector('.preview').innerHTML = article.data().description;
                // newcard.querySelector('.time-to-read').innerHTML = time_to_read + " minute read";
                newcard.querySelector('.country').innerHTML = article.data().country;

                // Set card hyperlink
                newcard.querySelector("a").href = "article.html?id=" + article.id;

                // Add card to DOM
                document.getElementById("for-you-cards-go-here").appendChild(newcard);
            })
        })
}

function loadDailyProgress() {
    userRef.onSnapshot(user => {
        articles_read_today = Number(user.data().articles_read_today);
        articlesPerDay_preference = Number(user.data().articlesPerDay_preference);
        document.getElementById("daily-progress-goes-here").innerHTML = `Daily Progress: ${articles_read_today} / ${articlesPerDay_preference} articles read`;
        var articlesLeft = Number(user.data().articlesPerDay_preference) - Number(user.data().articles_read_today);
    });
}