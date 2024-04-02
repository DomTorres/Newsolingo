function populateInfo() {
    // Function to populate user information
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Get current user's information from Firestore
            currentUser = db.collection("users").doc(user.uid);

            currentUser.get()
                .then(userDoc => {
                    let nType = userDoc.data().newsType;
                    let nCountry = userDoc.data().newsCountry;
                    let newsPerDay = userDoc.data().newsFrequency;

                    // Check if values are not null before assigning them to form fields
                    if (nType != null) {
                        document.getElementById("news-type").value = nType;
                    }
                    if (nCountry != null) {
                        document.getElementById("news-country").value = nCountry;
                    }
                    if (newsPerDay != null) {
                        document.getElementById("news-frequency").value = newsPerDay;
                    }
                });
        } else {
            console.log("No user is currently signed in");
        }
    });
}
// Call the function to populate user information
populateInfo();
