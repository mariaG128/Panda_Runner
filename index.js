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


async function loginToGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
    addNameToDatabase();
    readFromDatabase();
}

function signOut() {
    auth.signOut();
    deleteNameFromeDatabase();
    readFromDatabase();
}

function addNameToDatabase() {
    database.ref("/user").set({"userId" : auth.currentUser.displayName})
}

function deleteNameFromeDatabase() {
    database.ref("/user").set({"userId" : "Not Login"})
}
  
function readFromDatabase() {
    database.ref("/user/userId").once("value", function(snapshot){
      document.getElementById("userName").innerHTML = snapshot.val();
    });
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
function updateItem() {
    var itemName = document.getElementById("updateItemNameId").value
    var price = document.getElementById("updatePriceId").value
    var number = document.getElementById("updateNumberId").value
    var category = document.getElementById("updateCategoryId").value
    var itemData = {
        "itemName": itemName,
        "price": price,
        "number": number
    }
    console.log(itemData)
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
function deleteItem() {
    var itemName = document.getElementById("deleteItemNameId").value
    var category = document.getElementById("deleteCategoryId").value
    
    var userId = firebase.auth().currentUser.uid;
    var ref = database.ref("book/" + userId + '/' + category);
    var query = ref.orderByChild('itemName').equalTo(itemName);
    query.once("value", function(snapshot) {
        snapshot.forEach(function(child){
            child.ref.remove()
        })
    })
}

