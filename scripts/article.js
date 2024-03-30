const userID = localStorage.getItem("userID");
const userRef = db.collection("users").doc(userID);
var newsID;

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
loadArticle();

document.querySelector("#done-reading").addEventListener("click", () => {
    const docRef = db.collection("news").doc(newsID)

    console.log("clicked!");
    console.log(userID);
 
    const pointsForReading = 100;

    userRef.get()
        .then(user => {
            // Read points, articles read today
            points = user.data().points;
            articles_read_today = user.data().articles_read_today;

            // Update points, articles read today
            points += pointsForReading;
            articles_read_today++;

            // Write updated points
            userRef.update({
                points: points,
                articles_read_today: articles_read_today
            })

            // Delete article from "for you" array
            userRef.collection("for_you").doc(newsID).delete().then(() => {
                console.log("Article deleted.");
            }).catch((error) => {
                console.log("Error removing document, " + error);
            });

        })

});

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

