// init firebase
var config = {
  apiKey: "AIzaSyCPhDCpvQNQx7ZzUPz9bvcFpmFzi7rSAkc",
  authDomain: "train-scheduler-8139a.firebaseapp.com",
  databaseURL: "https://train-scheduler-8139a.firebaseio.com",
  projectId: "train-scheduler-8139a",
  storageBucket: "train-scheduler-8139a.appspot.com",
  messagingSenderId: "655380921389"
};

firebase.initializeApp(config);

var database = firebase.database();

// function for displaying the current time on our lovely page

function currentTime() {
  setInterval(function(){
      $('#currentTime').html(moment().format('hh:mm'))
    }, 1000);
  }
  currentTime();

//button grabs train inputs, trims em, formats train start time properly using moment, 
$("#trainForm").submit(function(event) {
  var trainName = $("#name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#first-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // train object holds all of our pertinent data, and then gets pushed to our firebase database
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };
database.ref().push(newTrain);

// empties out all the input boxes
$("#name-input").empty();
$("#destination-input").empty();
$("#first-input").empty();
$("#frequency-input").empty();
});

// firebase event - adds train to DB and row to html
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
//console.log(childSnapshot.val());
var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var trainStart = childSnapshot.val().start;
var trainFrequency = childSnapshot.val().frequency;

// first time 
  var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var remainder = diffTime % trainFrequency;
  console.log(remainder);

   // Minute Until Train
  var minutesTil = trainFrequency - remainder;
  console.log("MINUTES TILL TRAIN: " + minutesTil);

  // Next Train
  var nextTrain = moment().add(minutesTil, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  var formattedTime = moment(nextTrain).format("HH:mm");

// Add each train's data into the table
$("#train-table > tbody").append(
  "<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + formattedTime + "</td><td>" + minutesTil + "</td>");
});