var config = {
 apiKey: "AIzaSyDXWAzVnmDqN7CbMg69HRXg_oV1DwPY2pc",
 authDomain: "rock-paper-sissors-ee99b.firebaseapp.com",
 databaseURL: "https://rock-paper-sissors-ee99b.firebaseio.com",
 projectId: "rock-paper-sissors-ee99b",
 storageBucket: "",
 messagingSenderId: "432945519220"
};
firebase.initializeApp(config);

let database = firebase.database();
// change this to firebase as that's where this should be pulled from
let username;
let message;

$("#submitUserName").on("click", function() {
 username = $("#text").val().trim()
 $(".temp").fadeOut()
 database.ref().child("chat").set({
  username: username
 })
})
$("#sendMessage").on("click", function() {
 message = $("#chat").val().trim()
  database.ref().child("chat").push({
   message: message,
   user: username,
   time: moment().format("hh:mm")
  })
})

database.ref().child("chat").on("child_added", function(snapshot) {
 let name = $("<div>").addClass("name").text("(" + snapshot.val().time + ") " + snapshot.val().user + ": " + snapshot.val().message)
 $("#chatbox").append(name)
})

$("#player1").on("click", function() {
 $("#player1").fadeOut()
  database.ref().child("player1").set({
   username: username,
   losses: 0,
   wins: 0,
   ties: 0
  })
})
// need to make when log out gets deleted
$("#player2").on("click", function() {
 $("#player2").fadeOut()
  database.ref().child("player2").set({
   username: username,
   losses: 0,
   wins: 0,
   ties: 0
  })
})
// right now appending

// might do fadeout too so can't try to have multiple users on one browser window
// var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// });
// need to add names to the above and wins, ties and losses and also put what they picked so i can compare later
// need to add chat that also logs the time(hours and min) as well as names and whatever typed
// when player enters name it updates the above objects and puts them in player1 or player2 if player1 already has a player
// if there are more than two players say full
// show the options only to the player whose turn it is
// 