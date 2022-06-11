
const firebaseConfig = {
      apiKey: "AIzaSyD8fRw_DOZ7jBidCdGUF5dlR4ZkRHMlTZY",
      authDomain: "practicedatabase-839e3.firebaseapp.com",
      databaseURL: "https://practicedatabase-839e3-default-rtdb.firebaseio.com",
      projectId: "practicedatabase-839e3",
      storageBucket: "practicedatabase-839e3.appspot.com",
      messagingSenderId: "55993974558",
      appId: "1:55993974558:web:949edf5ca180de129e930f"
    };

    if(!firebase.apps.length){
          firebase.initializeApp(firebaseConfig);
    }
user_name=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";


function addRoom() {
      room_name=document.getElementById("room_name").value;
      localStorage.setItem("room_name", room_name);
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding user"
      });

      window.location="kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //start code
       console.log("Room Name - " + Room_names);
       row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#" + Room_names +"</div><hr>";
       document.getElementById("output").innerHTML += row;
      //end code
      });});}
getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}