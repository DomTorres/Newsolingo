
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
                                console.log("Saved preferences");
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Your work has been saved",
                                    showConfirmButton: false,
                                    timer: 1200
                                    
                                
                                  });
                                 setTimeout( function() { window.location = "main.html" }, 1200 );  
                            })
                            
                    })
        
    })
}

function populateInfo() {
   
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            
            // go and get the curret user info from firestore
            currentUser = db.collection("users").doc(user.uid);

            currentUser.get()
                .then(userDoc => {
                    let nType = userDoc.data().category_preference;
                    let nCountry = userDoc.data().country_preference;
                    let newsPerDay = userDoc.data().articlesPerDay_preference;
                    

                    if (nType != null) {
                        document.getElementById("news-type").value = nType;
                    }
                    if (nCountry != null) {
                        document.getElementById("news-country").value = nCountry;
                    }
                    if (newsPerDay != null) {
                        console.log(newsPerDay)
                        document.getElementById("news-frequency").value = newsPerDay;
                    }
                    
                })

            } else {
            console.log("no user is logged in")
        }
    }

    )

}
populateInfo();