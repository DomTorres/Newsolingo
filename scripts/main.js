function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #1:  insert with JS
            document.getElementById("name-goes-here").innerText = userName;    

            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
            console.log ("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function
/*
function writeNews() {
    //define a variable for the collection you want to create in Firestore to populate data
    var newsRef = db.collection("news");

    newsRef.add({
        code: "NEWS01",
        name: "Article 1", //replace with your own city?
        city: "Burnaby",
        province: "BC",
				details: "A lovely place for lunch walk",
        read_time: 2,          
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    newsRef.add({
        code: "NEWS02",
        name: "Article 2", //replace with your own city?
        city: "Anmore",
        province: "BC",
        details: "Close to town, and relaxing",
        read_time: 3,      
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    newsRef.add({
        code: "NEWS03",
        name: "Article 3", //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        details:  "Amazing ski slope views",
        length: 3,        //number value
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
    newsRef.add({
        code: "NEWS04",
        name: "Article 4", //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        details:  "Amazing ski slope views",
        length: 3,        //number value
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
    newsRef.add({
        code: "NEWS05",
        name: "Article 5", //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        details:  "Amazing ski slope views",
        length: 3,        //number value
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
    newsRef.add({
        code: "NEWS06",
        name: "Article 6", //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        details:  "Amazing ski slope views",
        length: 3,        //number value
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("newsCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allNews=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allNews.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
								var newsCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                var newsLength = doc.data().read_time;
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-length').innerHTML = newsLength +"mins.";
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/placeholder.png`; 
                newcard.querySelector('a').href = "eachHike.html?docID=" + docID;
                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("news");  //input param is the name of the collection
*/