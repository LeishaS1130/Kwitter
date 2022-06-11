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
    room_name=localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
      console.log(firebase_message_id);
      console.log(message_data);
      Name = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];
      name_with_tag = "<h4> "+ Name +"<img class='user_tick' src='tick.png'></h4>";
      message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
      like_button = "<button class='btn-grad4' id="+ firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      span_with_tag = "<span class= 'glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

      row = name_with_tag + message_with_tag + like_button + span_with_tag;
      document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      playSent();

      document.getElementById("msg").value="";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      playBye();
      setTimeout(()=>{
            window.location="index.html";
      },3000);
}

function updateLike(message_id){
      console.log("clicked on like button - "+ message_id);
      button_id = message_id;
      likes=document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}

function playSent(){
      document.getElementById("sent").play();
}

function playBye(){
      document.getElementById("bye").play();
}