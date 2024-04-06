var ImageFile;      //global variable to store the File Object reference

function chooseFileListener() {
   
    const fileInput = document.getElementById("profile-load");   // pointer #1
    const image = document.getElementById("profile-pic");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {
       
        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
chooseFileListener();


function editUserInfo() {
    //Enable the form fields
    document.getElementById("personalInfoFields").disabled = false;
}
function saveUserInfo() {

    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

        //Asynch call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');
             
                //Asynch call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        
                        console.log("Got the download URL.");
                        //get values from the from
                        uName = document.getElementById("nameImput").value;
                        userName1 = document.getElementById("username-imput").value;
                        uCountry = document.getElementById("country-form").value;

                        //Asynch call to save the form fields into Firestore.
                        db.collection("users").doc(user.uid).update({
                            name: uName,
                            username: userName1,
                            userCountry: uCountry,
                            profilePic: url // Save the URL into users collection
                        })
                            .then(function () {
                                
                                console.log(uName, userName1, uCountry)
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved user profile info');
                                document.getElementById('personalInfoFields').disabled = true;
                                window.location.href = "main.html";
                                 
                            })
                    })
            })
    })
}


function populateInfo() {
   debugger
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            
            // go and get the curret user info from firestore
            currentUser = db.collection("users").doc(user.uid);
debugger
            currentUser.get()
                .then(userDoc => {
                    let Name = userDoc.data().name;
                    let userName = userDoc.data().username;
                    let uCountry = userDoc.data().userCountry;
                    let picUrl = userDoc.data().profilePic;
                    debugger

                    if (Name != null) {
                        document.getElementById("nameImput").value = Name;
                    }debugger
                    if (userName != null) {
                        document.getElementById("username-imput").value = userName;
                    }debugger
                    if (uCountry != null) {
                        console.log(uCountry)
                        document.getElementById("country-form").value = uCountry;
                    }debugger
                    if (picUrl != null) {
                        console.log(picUrl);
                        document.getElementById("profile-pic").src = picUrl;
                        debugger
                    }  
                    else
                        console.log("picURL is null");
                })

        } else {
            console.log("no user is logged in")
        }
    }

    )

}
populateInfo();