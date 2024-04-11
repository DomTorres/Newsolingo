// loads navbar
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                
            // User is signed in.
            console.log("Logged in.");

            $('#navbarPlaceholder').load('./text/nav_after_login.html');
            console.log("Logged-in navbar loaded.");

        } else {
            // No user is signed in.
            console.log("Not logged in.");

            $('#navbarPlaceholder').load('./text/nav_before_login.html');
            console.log("Logged-out navbar loaded.");

        }
    });
}
loadSkeleton(); 

// user constants
var userID;
var userRef;

// triggers function calls
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("Logged in");

        userID = user.uid;
        console.log(userID);

        userRef = db.collection("users").doc(userID);
        console.log(userRef);

        // localStorage.setItem("userID", user.uid);
        console.log("Saved auto userID to local storage.");

        // call function isNewDay
        loadUserStats();

    } else {
        console.log("No user is signed in.");
    }
});

// load points and streak in navbar
function loadUserStats() {
    userRef.onSnapshot(user => {
        let points = user.data().points;
        document.querySelector("#points-go-here").innerHTML = points;

        let streak = user.data().streak;
        document.querySelector("#streak-goes-here").innerHTML = streak;
    })

}