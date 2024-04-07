var userID;
var userRef;
var newsID;
var displayName;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("Logged in");

        userID = user.uid;
        displayName = user.displayName;
        console.log(userID);

        userRef = db.collection("users").doc(userID);
        console.log(userRef);

        // localStorage.setItem("userID", user.uid);
        console.log("Saved auto userID to local storage.");

        // call function isNewDay
        loadArticle();

    } else {
        console.log("No user is signed in.");
    }
});

function loadArticle() {
    let params = new URL(window.location.href);

    newsID = params.searchParams.get("id"); 
    const docRef = userRef.collection("for_you").doc(newsID);

    docRef.get().then(article => {
        var title = article.data().title;
        var image = article.data().image;
        var content = article.data().content;

        document.querySelector("#title").innerHTML = title;
        document.querySelector("#image").setAttribute("src", image);
        document.querySelector("#content").innerHTML = content;
    })
}

document.querySelector("#done-reading").addEventListener("click", () => {
    const docRef = db.collection("news").doc(newsID)
 
    const pointsForReading = 100;

    userRef.get()
        .then(user => {
            // Read points, articles read today
            points = user.data().points;
            console.log("Points read from database:" + points);

            streak = user.data().streak;
            console.log("Streak read from database: " + streak);

            articles_read_today = user.data().articles_read_today;
            console.log("Articles read today read from database: " + articles_read_today);

            articlesPerDay_preference = user.data().articlesPerDay_preference;
            console.log("Articles per day preference read from database: " + articlesPerDay_preference);

            // Update points, articles read today
            points += pointsForReading;
            console.log(articles_read_today);
            articles_read_today++;
            console.log(articles_read_today);
            if (articles_read_today == articlesPerDay_preference) {
                streak++;
            }

            console.log(articles_read_today);
            // Write updated points
            userRef.update({
                points: points,
                articles_read_today: articles_read_today,
                streak: streak
            })

            var articlesLeft = Number(articlesPerDay_preference) - Number(articles_read_today);
            console.log("Articles left: " + articlesLeft);

            document.getElementById("encouragement-message").innerHTML = `Great going, ${displayName}!`;

            if (articlesLeft == 0) {
                document.getElementById("modal-progress-message").innerHTML = `You've completed your daily goal! Come back tomorrow.`;

                let completedDailyGoalSound = new Audio("./../sounds/completeddailygoal.wav")
                completedDailyGoalSound.play();
            } else {
                document.getElementById("modal-progress-message").innerHTML = `Nice going! Read ${articlesLeft} more articles to complete your daily goal.`;

                let doneReadingSound = new Audio("./../sounds/donereading.wav");
                doneReadingSound.play();
            }

            // Delete article from "for you" array
            deleteArticleFromForYou();  
        });
});

function deleteArticleFromForYou() {
    userRef.collection("for_you").doc(newsID).delete().then(() => {
        console.log("Article deleted.");
    }).catch((error) => {
        console.log("Error removing document, " + error);
    });
}

document.querySelector("#back-to-for-you-page").addEventListener("click", () => {
    window.location.replace("main.html");
})

document.querySelector("#save").addEventListener("click", () => {
    const userID = localStorage.getItem("userID");
    const userRef = db.collection("users").doc(userID);

    userRef.update({
        saved: firebase.firestore.FieldValue.arrayUnion(newsID)
    })
    .then(() => {
        alert("saved!");
    })
})


