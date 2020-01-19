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


function loginToGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}

function signOut() {
    auth.signOut();
}

  
function addNewItem() {
    
    var itemName = document.getElementById("itemNameId").value
    var price = document.getElementById("priceId").value
    var number = document.getElementById("numberId").value
    var category = document.getElementById("categoryId").value
    var itemData = {
        "itemName": itemName,
        "price": price,
        "number": number
    }
    
    var userId = firebase.auth().currentUser.uid;
    // Get a key for a new item.
    var bookRef = firebase.database().ref('book/' + userId + '/' + category);
    var newItem = bookRef.push()
    return newItem.set(itemData);
}

// update an item
function updateItem(itemName, price, number, category) {
    var itemData = {
        "itemName": itemName,
        "price": price,
        "number": number
    }
    var userId = firebase.auth().currentUser.uid;
    var ref = database.ref("book/" + userId + '/' + category);
    var query = ref.orderByChild('itemName').equalTo(itemName);
    query.once("value", function(snapshot) {
        snapshot.forEach(function(child){
            child.ref.update(itemData)
        })
    })
}

//delete an item
function deleteItem(category, itemName) {
    var userId = firebase.auth().currentUser.uid;
    var ref = database.ref("book/" + userId + '/' + category);
    var query = ref.orderByChild('itemName').equalTo(itemName);
    query.once("value", function(snapshot) {
        snapshot.forEach(function(child){
            child.ref.remove()
        })
    })
}

