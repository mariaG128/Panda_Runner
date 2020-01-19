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

  

  function writeItemData(itemName, price, number, category) {
    firebase.database().ref('item/' + itemName).set({
      n: itemName,
      p: price,
      nu : number,
      ca:category
    });
  }

  
  function addNewItem(itemName, price, number, category) {
    
    var itemData = {itemName,price,number,category};

    // Get a key for a new item.
    var newItemKey = firebase.database().ref().child('item').push().key;
  
    // Write the new item's data simultaneously in the item list and the item's category list.
    var updates = {};
    updates['/item-category/' + ca + '/item-Name/' + itemName+'/item-Key/'+newItemKey] = itemData;
  
    return firebase.database().ref().update(updates);
  }

  //delete an item
  function deleteItem(itemKey,number) {
    database.ref("/item-Key/"+itemKey).remove();
}
