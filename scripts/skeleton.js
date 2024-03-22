function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            console.log("Logged in.");

            $('#navbarPlaceholder').load('./text/nav_after_login.html');
            console.log("Logged-in navbar loaded.");

            $('#footerPlaceholder').load('./text/footer.html');
            console.log("Logged-in footer loaded.");
        } else {
            // No user is signed in.
            console.log("Not logged in.");

            $('#navbarPlaceholder').load('./text/nav_before_login.html');
            console.log("Logged-out navbar loaded.");

            $('#footerPlaceholder').load('./text/footer.html');
            console.log("Logged-out footer loaded.");
        }
    });
}
loadSkeleton(); 