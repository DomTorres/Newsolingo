var ImageFile;      //global variable to store the File Object reference

function chooseFileListener() {
    debugger
    const fileInput = document.getElementById("profile-load");   // pointer #1
    const image = document.getElementById("profile-pic");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {
        console.log("hello");
        debugger
        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
chooseFileListener();



function saveUserInfo() {

    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

        //Asynch call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');
                debugger
                //Asynch call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        
                        console.log("Got the download URL.");
                        //get values from the from
                        uName = document.getElementById("nameImput").value;
                        userName1 = document.getElementById("username-imput").value;
                        uCountry = document.getElementById("country-form").value;
                        nType = document.getElementById("news-type").value;
                        nCountry = document.getElementById("news-country").value;
                        newsPerDay = document.getElementById("news-frequency").value;
                        //Asynch call to save the form fields into Firestore.

                        yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);

                        db.collection("users").doc(user.uid).update({
                            name: uName,
                            username: userName1,
                            userCountry: uCountry,
                            profilePic: url, // Save the URL into users collection
                            category_preference: nType,
                            country_preference: nCountry,
                            articlesPerDay_preference: newsPerDay,
                            date_last_loaded: String(yesterday),
                            articles_read_today: 0,
                            points: 0,
                            streak: 0

                        })
                            .then(function () {
                                
                                console.log(uName, userName1, uCountry, nType, nCountry, newsPerDay)
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved user profile info');
                                console.log("Save user preferences");
                                document.getElementById('personalInfoFields').disabled = true;
                                alert("Saved");
                                window.location.assign("main.html");
                            })
                    })
            })
    })
}
