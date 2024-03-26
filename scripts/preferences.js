//container
const preference = {
    newsType: "",
    newsPerDay: ""
};

populateInfo() //Load information by user

function saveUser() {
    preference.newsType = document.getElementById("news-genres").value;
    preference.newsPerDay = getValueRadioButton();
    saveUserInfo()
}

function getValueRadioButton() {
    let selectedValue = null
    // Get the selected radio button
    let selectedRadioButton = document.querySelector('input[name="radio"]:checked');

    // Get the value of the selected radio button
    selectedValue = selectedRadioButton.value;
    return selectedValue
}

function saveUserInfo() {

    firebase.auth().onAuthStateChanged(function (user) {
        //Asynch call to save the form fields into Firestore.
        db.collection("users").doc(user.uid).update({
            preferenceBD: preference
        })
            .then(function () {
                debugger
                alert("saved");
            })
    })
}

function populateInfo() {
    debugger
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            debugger
            // go and get the curret user info from firestore
            currentUser = db.collection("users").doc(user.uid);

            currentUser.get()
                .then(userDoc => {
                    console.log("esto es un console log", userDoc.data())
                    let newsType = userDoc.data().preferenceBD.newsType
                    document.getElementById("news-genres").value = newsType

                    let newsPerDay = userDoc.data().preferenceBD.newsPerDay
                    const radio = document.querySelector(`input[name="radio"][value="${newsPerDay}"]`);
                    debugger
                    if (radio) {
                        radio.checked = true;
                    }

                })

        } else {
            console.log("no user is logged in")
        }
    }
    )
}