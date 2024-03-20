var newsID;

function loadArticle() {
    let params = new URL(window.location.href);

    newsID = params.searchParams.get("articleID"); 
    const docRef = db.collection("news").doc(newsID)

    docRef.get().then(article => {
        var title = article.id;
        var image = article.data().image;
        var content = article.data().content;

        document.querySelector("#title").innerHTML = title;
        document.querySelector("#image").setAttribute("src", image);
        document.querySelector("#content").innerHTML = content;
    })
}
loadArticle();

document.querySelector("#done-reading").addEventListener("click", () => {

    const userID = localStorage.getItem("userID");
    const userRef = db.collection("users").doc(userID);
    const docRef = db.collection("news").doc(newsID)

    console.log("clicked!");
    console.log(userID);
 
    const pointsForReading = 100;

    userRef.get()
        .then(user => {
            // Read user's current points
            points = user.data().points;
            console.log("Old points: " + points);

            // Add pointsForReading 
            points += pointsForReading;

            // Write updated points
            userRef.update({
                points: points
            })
            console.log("added points");

            console.log(newsID);
            userRef.update({
                for_you: firebase.firestore.FieldValue.arrayRemove(newsID)
            })
            console.log("deleted from for you array");
        })
});

