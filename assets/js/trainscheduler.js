
var config = {
  apiKey: "AIzaSyDuBAlgRQmcDlpuPBLn4mOkl0eaAnFqjFM",
  authDomain: "trainscheduler-8b39f.firebaseapp.com",
  databaseURL: "https://trainscheduler-8b39f.firebaseio.com",
  projectId: "trainscheduler-8b39f",
};

firebase.initializeApp(config);

var database = firebase.database();


$("#addTrain").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var trainDestination = $("#destination").val().trim();

  var trainTime = $("#time").val().trim();
  var trainFrequency = $("#frequency").val().trim();

  var newtrain = {
    trainName: trainName,
    trainDestination: trainDestination,
    trainTime: trainTime,
    trainFrequency: trainFrequency
  };

  database.ref().push(newtrain);

  console.log(newtrain.trainName);
  console.log(newtrain.trainDestination);
  console.log(newtrain.trainTime);
  console.log(newtrain.trainFrequency);

  $("#trainName").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");
});



database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().trainName;
  var trainDestination = childSnapshot.val().trainDestination;
  var trainTime = childSnapshot.val().trainTime;
  var trainFrequency = childSnapshot.val().trainFrequency;

  var firstTrainTime = moment(trainTime, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTrainTime), "minutes");

  var minutesAway = diffTime % trainFrequency;

  var tMinutesTillTrain = trainFrequency - minutesAway;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");



  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain.format("HH:mm")),
    $("<td>").text(tMinutesTillTrain),
  );

  $("#allTable > tbody").append(newRow);
 
});




//clock
setInterval(function() {

  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  // Add leading zeros
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  // Compose the string for display
  var currentTimeString = hours + ":" + minutes + ":" + seconds;
  $(".clock").html("Current Time is: " + currentTimeString);

  
}, 1000);




