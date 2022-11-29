const firebaseConfig = {
  apiKey: "AIzaSyCnVdtFwjRgOfEsD3XXk6eWYi_2Yehgs-I",
  authDomain: "sashimi-firebase.firebaseapp.com",
  projectId: "sashimi-firebase",
  storageBucket: "sashimi-firebase.appspot.com",
  messagingSenderId: "712599675492",
  appId: "1:712599675492:web:7818d44b215b8ac2c63571",
  measurementId: "G-REHYQ60EN3"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
let dbRef = db.ref("text");

//  var data ={
//    name: "q",
//    word: "hello"
//  }
 
// dbRef.push(data);


let chatContainer = document.getElementById("chat-container");
let entry = document.getElementById("text-input-entry");
let share = document.getElementById("text-input-submit");


dbRef.on("child_added", gotText);

function gotText(data) {
  let id = data.key;
  let value = data.val();
  console.log(value);
  chatContainer.innerHTML =
    "<div class='response'>" + value + "</div>" + chatContainer.innerHTML;
}

//click button will run this function
const textInputSubmit = document.getElementById("text-input-submit");
textInputSubmit.addEventListener("click", submitText);

let textContainerElement = document.getElementById("text-input-entry");

function submitText() {
  let textToSubmit = textContainerElement.value; //gets text value from textbox
  let newKey = dbRef.push().key; //ask firebase to give you a new key / 'name'
  let updates = {}; //send firebase list of values
  updates[newKey] = textToSubmit;
  dbRef.update(updates);
}

function submitlock() {
  entry.remove();
  share.value = "Thanks for telling me.";
  share.disabled = true;
  share.style.width = "70%";
}
