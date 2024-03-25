function displayCards() {
    console.log("Entered function displayCards");

    const userID = localStorage.getItem("userID");
    const userRef = db.collection("users").doc(userID);

    let cardTemplate = document.getElementById("newsCardTemplate");

    userRef.get()
        .then(user => {
            var articlesToShow = user.data().saved.length;

            for(let i = 0; i < articlesToShow; i++) {
                let forYouNewsID = user.data().saved[i];

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
                        document.getElementById("saved-cards-go-here").appendChild(newcard);
                    })
            }
        })
}
displayCards();