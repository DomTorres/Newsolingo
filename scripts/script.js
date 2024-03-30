//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    console.log("Logging out");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}

// document.getElementById("logout-button").addEventListener("click", logout);

// Set global variable containing logged-in user's ID
// var userID;

// function getUserID() {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       userID = user.uid;
//     }
//   })
// }
// getUserID()