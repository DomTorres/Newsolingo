firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("Logged in");
        console.log(user.displayName);

        userID = user.uid;
        console.log(userID);

        userRef = db.collection("users").doc(userID);
        console.log(userRef);

        // call function isNewDay
        displayCards();

    } else {
        console.log("No user is signed in.");
    }
});

async function displayCards() {
    console.log("Entered function displayCards.");

    let cardTemplate = document.getElementById("newsCardTemplate");

    userRef.collection("saved").get()
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
                document.getElementById("saved-cards-go-here").appendChild(newcard);
            })
        })
}