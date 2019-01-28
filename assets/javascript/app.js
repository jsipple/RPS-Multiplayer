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
let player1 = {
 username: null,
 wins: 0,
 losses: 0,
 ties: 0
}
let player2 = {
 username: null,
 wins: 0,
 losses: 0,
 ties: 0
}

$("#submit").on("click", function(event) {
 event.preventDefault();
 if (player1.username === null && player2.username === null) {
  player1.username = $("#text").val().trim();
  player1.wins = 0;
  player1.losses = 0;
  player1.ties = 0;
  database.ref().push({
   player1: player1
  })
 }
 // this overrides player1 right now pushing solves that
 else if (player2.username === null && player1.username !== null) {
  player2.username = $("#text").val().trim();
  console.log($("#text").val().trim())
  player2.wins = 0;
  player2.losses = 0;
  player2.ties = 0;
  database.ref().push({
   player2: player2
  })
 }
 else {
 alert("lobby is full")
}
})
// need to add names to the above and wins, ties and losses and also put what they picked so i can compare later
// need to add chat that also logs the time(hours and min) as well as names and whatever typed
// when player enters name it updates the above objects and puts them in player1 or player2 if player1 already has a player
// if there are more than two players say full
// show the options only to the player whose turn it is
// 