function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            console.log("Logged in.");

            $('#navbarPlaceholder').load('./text/nav_after_login.html');
            console.log("Logged-in navbar loaded.");

            // $('#footerPlaceholder').load('./text/footer.html');
            // console.log("Logged-in footer loaded.");
        } else {
            // No user is signed in.
            console.log("Not logged in.");

            $('#navbarPlaceholder').load('./text/nav_before_login.html');
            console.log("Logged-out navbar loaded.");

            // $('#footerPlaceholder').load('./text/footer.html');
            // console.log("Logged-out footer loaded.");
        }
    });
}
// loadSkeleton(); 

function loadMobileSkeleton() {
    console.log("mobile view");
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("logged in");
            $("#footerPlaceholder").load("./text/nav_after_login.html");
        } else {
            console.log("not logged in");
            $("#footerPlaceholder").load("./text/nav_before_login.html");
        }
    });
}

function loadWebSkeleton() {
    console.log("web view");
    firebase.auth().onAuthStateChanged(user => {
        if (user) {                
            // User is signed in.
            console.log("Logged in.");

            $('#navbarPlaceholder').load('./text/nav_after_login.html');
            console.log("Logged-in navbar loaded.");

            // $('#footerPlaceholder').load('./text/footer.html');
            // console.log("Logged-in footer loaded.");
        } else {
            // No user is signed in.
            console.log("Not logged in.");

            $('#navbarPlaceholder').load('./text/nav_before_login.html');
            console.log("Logged-out navbar loaded.");

            // $('#footerPlaceholder').load('./text/footer.html');
            // console.log("Logged-out footer loaded.");
        }
    });
}

var userID;
var userRef;

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

function loadUserStats() {
    userRef.onSnapshot(user => {
        let points = user.data().points;
        document.querySelector("#points-go-here").innerHTML = points;

        let streak = user.data().streak;
        document.querySelector("#streak-goes-here").innerHTML = streak;
    })

}

// Media Queries, support for mobile

var query = window.matchMedia("(max-width: 450px)"); 

function myFunction(query) {
    if (query.matches) {
        // mobile view
        // alert("mobile view");
        loadMobileSkeleton();
    } else {
        // web view
        // alert("web view");
        loadWebSkeleton();
    }
  }
myFunction(query);

// query.addEventListener("change", () => {
//     myFunction(query);
// });