
function saveUserInfo() {

    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

    
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        
                        console.log("Got the download URL.");
                        //get values from the from
                        nType = document.getElementById("news-type").value;
                        nCountry = document.getElementById("news-country").value;
                        newsPerDay = document.getElementById("news-frequency").value;
                        //Asynch call to save the form fields into Firestore.
                        db.collection("users").doc(user.uid).update({
                            category_preference: nType,
                            country_preference: nCountry,
                            articlesPerDay_preference: newsPerDay,
                            
                        })
                            .then(function () {
                                
                                console.log(nType, nCountry, newsPerDay)
                                console.log("Save preferences");
                                alert("Saved");
                                window.location.assign("main.html");
                            })
                    })
        
    })
}
