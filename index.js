// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD3-cWuwLgADptEdheQ179E3_UYQY5tzB4",
    authDomain: "fir-demo-bea53.firebaseapp.com",
    databaseURL: "https://fir-demo-bea53.firebaseio.com",
    projectId: "fir-demo-bea53",
    storageBucket: "fir-demo-bea53.appspot.com",
    messagingSenderId: "8929190603",
    appId: "1:8929190603:web:4f5cd0feb3d9d665c2f14e",
    measurementId: "G-GE4LPT8MMZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  let auth = firebase.auth();
  let database = firebase.database();
  let storage = firebase.storage();

  