// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO22teJvx6BKlnd0t7q7P0FfrDqzGL9c4",
  authDomain: "newsolingo.firebaseapp.com",
  projectId: "newsolingo",
  storageBucket: "newsolingo.appspot.com",
  messagingSenderId: "206908939289",
  appId: "1:206908939289:web:74974c3d3e5d56c183de88"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// API Key for GNews API
const news_api_key = "b2455571715527d9eca18e89650be00d";
