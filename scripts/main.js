function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #1:  insert with JS
            document.getElementById("name-goes-here").innerText = userName;    

            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
            console.log ("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("newsCardTemplate");

    db.collection(collection).get()
        .then(allNews => {
            allNews.forEach(article => {
                var headline = article.data().Headline;
                var preview = article.data().Preview;
                // var time_to_read = article.data().Time-To-Read;
                var country = article.data().Country;

                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector('.headline').innerHTML = headline;
                newcard.querySelector('.preview').innerHTML = preview;
                // newcard.querySelector('.time-to-read').innerHTML = time_to_read;
                newcard.querySelector('.country').innerHTML = country;

                document.getElementById("for-you-cards-go-here").appendChild(newcard);
            })
        })
}
