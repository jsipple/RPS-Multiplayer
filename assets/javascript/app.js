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
let user1 = undefined;
let user2 = undefined;
let user1Losses = 0
let user2Losses = 0
let user2Ties = 0
let user2Wins = 0
let user1Ties = 0
let user1Wins = 0
let rock1 = $("<button>").text("rock").addClass("rock1").on("click", function() {
  database.ref().child("choice1").set({
    choice: "rock"
  })
})
let paper1 = $("<button>").text("paper").addClass("paper1").on("click", function() {
  database.ref().child("choice1").set({
    choice: "paper"
  })
})
let sissors1 = $("<button>").text("sissors").addClass("sissor1").on("click", function() {
  database.ref().child("choice1").set({
    choice: "scissor"
  })
})
let rock2 = $("<button>").text("rock").addClass("rock2").on("click", function() {
  database.ref().child("choice2").set({
    choice: "rock"
  })
})
let paper2 = $("<button>").text("paper").addClass("paper2").on("click", function() {
  database.ref().child("choice2").set({
    choice: "paper"
  })
})
let sissors2 = $("<button>").text("sissors").addClass("sissor2").on("click", function() {
  database.ref().child("choice2").set({
    choice: "scissor"
  })
})
// database.ref().child("player1").on("child_added", function(snapshot) {
//   user1=snapshot.val().username
//   console.log(snapshot.val().username)
// })
// database.ref().child("player2").on("child_added", function(snapshot) {
//   user2=snapshot.val().username
// })

database.ref().child("choice2").on("value", function(snapshot) {
  choice2 = snapshot.val().choice
  database.ref().child("choice1").on("value", function(snapshot) {
    choice1 = snapshot.val().choice
  })
  if (choice1 !== null && choice2 !== null) {
  if (choice1 === "rock") {
    if (choice2 === "rock") {
      user1Ties++
      user2Ties++
      // lets just update the user score and then do an update for all at the end

    }
    if (choice2 === "paper") {
      user1Losses++
      user2Wins++
    }
    if (choice2 === "scissor") {
      user1Wins++
      user2Losses++
    }
  }
  if (choice1 === "paper") {
    if(choice2 === "rock") {
      user1Wins++
      user2Losses++
    }
    if (choice2 === "paper") {
      user1Ties++
      user2Ties++
    }
    if (choice2 === "scissor") {
      user1Losses++
      user2Wins++
    }
  }
  if (choice1 === "scissor") {
    if (choice2 === "rock") {
      user1Losses++
      user2Wins++
    }
    if (choice2 === "paper") {
      user1Wins++
      user2Losses++
    }
    if (choice2 === "scissor") {
      user1Ties++
      user2Ties++
    }
  }
        database.ref().child("player1").update({
        wins: user1Wins,
        losses: user1Losses,
        ties: user1Ties
      })
      database.ref().child("player2").update({
        wins: user2Wins,
        losses: user2Losses,
        ties: user2Ties
      })
      database.ref().child("choice1").update({
        choice: null
      })
      database.ref().child("choice2").update({
        choice: null
      })
    }
})

$("#submitUserName").on("click", function() {
 username = $("#text").val().trim()
 $(".temp").fadeOut()
 database.ref().child("chat").set({
  username: username
 })
 database.ref("player1").on("value", function(snapshot) {
  user1 = snapshot.val().username
  if (snapshot.val().username == null) {
    $("#player1").show()
    console.log("a")
  }
   if (snapshot.val().username != null) {
     console.log(user1)
   }
 })
 database.ref("player2").on("value", function(snapshot) {
   if (user2 == null && user1 !== null) {
    user2 = snapshot.val().username
  }
 })
})
database.ref("player1").on("value", function(snapshot) {
  if (user1 !== null && user2 === null) {
    $("#player2").show()
  }
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
  if(snapshot.val().time !== undefined) {
 let name = $("<div>").addClass("name").text("(" + snapshot.val().time + ") " + snapshot.val().user + ": " + snapshot.val().message)
 $("#chatbox").append(name)
  }
})

// look and window events to see what happens when window is closed and use that to set player to null if not put log out button

// window.onbeforeunload set the player you are = to null so if (user === snapshot.val().child("player1").user == username 

// need to figure out q first then can do a function if
// window.onbeforeunload = function 


// if (user === snapshot.val().child("player2").user === username))
// if undefined don't send message

$("#player1").on("click", function() {
 $("#player1").hide()
 $("#player2").hide()
 $("#user1").append(rock1, paper1, sissors1)
  database.ref().child("player1").set({
   username: username,
   losses: user1Losses,
   wins: user1Wins,
   ties: user1Ties
  })
  // this is not setting it for other windows not going trough
  database.ref().child("player1").on("value", function(snapshot) {
    $("#user1name").text(snapshot.val().username)
    $("#score1").html("<p>losses: " + snapshot.val().losses + "</p>" + "<p>wins: " + snapshot.val().wins +"</p>" + "<p>ties: " + snapshot.val().ties + "</p>")
  })
})

database.ref().child("player2").on("child_added", function(snapshot) {
  // not setting this
  user2 = snapshot.val().username
  console.log(user1)
})


// need to make when log out gets deleted
$("#player2").on("click", function() {
 $("#player2").hide()
 $("#user2").append(rock2, paper2, sissors2)
  database.ref().child("player2").set({
   username: username,
   losses: user2Losses,
   wins: user2Wins,
   ties: user2Ties
  })
  database.ref().child("player2").on("value", function(snapshot) {
    $("#user2name").text(snapshot.val().username)
    $("#score2").html("<p>losses: " + snapshot.val().losses + "</p>" + "<p>wins: " + snapshot.val().wins +"</p>" + "<p>ties: " + snapshot.val().ties + "</p>") 
  })
  
})

//TODO: will have a bug if multiple users of the same name so need to fix that might be wierd but could add a timestamp when created to and compare that just go down to miliseconds in case two people join at the same time 
// i can also make a log out button with similar function 
// TODO: seems to also log you out when you go out of the window
window.addEventListener("beforeunload", function() {
  if (username = user1) {
    database.ref().child("player1").update({
      username: null
    })
  }
  if (username = user2) {
    database.ref().child("player1").update({
      username: null
    })
  }
})
// this click not doing anything

// TODO: make it turn based

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
// need to not show options until both players
// need to not show user2 options until player one has picked and then put something in the middle saying whose turn it is also put the result like player1 tied or won etc