// Initialize Firebase
var config = {
    apiKey: "AIzaSyDq0LSHFQGpZuS8YMAfov66UGSzFZPYC-A",
    authDomain: "train-schedule-65495.firebaseapp.com",
    databaseURL: "https://train-schedule-65495.firebaseio.com",
    projectId: "train-schedule-65495",
    storageBucket: "train-schedule-65495.appspot.com",
    messagingSenderId: "671065271483"
  };

firebase.initializeApp(config);

// Create a reference the database
var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;
var minutesToArrival;
var arrivalTime;

// on click event 
// Targets button id #addTrain & gets the form data and pushes it to the firebase database
$("#addTrain").on("click", function (event) {
    
    event.preventDefault();
  
    // gets user input from form
    trainName = $("#train-name-input").val().trim();
        // console.log(trainName);
    destination = $("#destination-input").val().trim();
        // console.log(destination);
    firstTrain = $("#first-train-input").val().trim();
        // console.log(firstTrain);
    frequency = $("#frequency-input").val().trim();
        // console.log(frequency);

    // Creates local "temporary" object for holding train data    
    // var newTrain = {    
    //     trainName: trainName,
    //     destination: destination,
    //     firstTrain: firstTrain,
    //     frequency: frequency,
    // };

    // push info to firebase
    // database.ref().push(newTrain);
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    });
        
    //logs everything to the console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    // Alert
    alert("Train Schedule successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
}); 

// Create Firebase event for adding new train schedules to the database and a row in the html when a user adds an entry
// database.ref().on("child_added", function(childSnapshot, prevChildKey) {
database.ref().on("child_added", function(snapshot) {

    console.log(snapshot.val());

    // var trainName = childSnapshot.val().trainName;
    // var destination = childSnapshot.val().destination;
    // var firstTrain = childSnapshot.val().firstTrain;
    // var frequency = childSnapshot.val().frequency;

    // Train Info
    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTrain);
    // console.log(frequency);

    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

    // log object to the console.
    console.log(snapshot.val());

    // First Train Time (pushed back 1 year to make sure it comes before current time)

    // CONSOLE READING THAT SNAPSHOT OR CHILDSNAPSHOT IS NOT DEFINED--???
    // var firstTrainTime = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    // console.log(firstTrainTime);

    var firstTrainTime = moment(snapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainTime);

    // gets the current time
    var currentTime = moment();
    console.log("Time Now Is: " + moment(currentTime).format("hh:mm"));
  
    // Calculates the time difference
    var timeDifference = moment().diff(moment(firstTrainTime), "minutes");
    // console.log("Time Difference: " + diffTime);

    // Time remaining
    var timeRemaining = timeDifference % snapshot.val().frequency;
    // console.log("Time Remaining");

   


    // train table 
    var trainData = $('<tr>');

    // Append train data into the table
    // trainData.append(`<td>${childSnapshot.val().trainName}</td>`);
    //     console.log(snapshot.val());
    // trainData.append(`<td>${childSnapshot.val().destination}</td>`);
    //     console.log(snapshot.val());
    // trainData.append(`<td>${childSnapshot.val().frequency}</td>`);
    //     console.log(childSnapshot.val());

    trainData.append(`<td>${snapshot.val().trainName}</td>`);
        console.log(snapshot.val());
    trainData.append(`<td>${snapshot.val().destination}</td>`);
        console.log(snapshot.val());
    trainData.append(`<td>${snapshot.val().frequency}</td>`);
        console.log(snapshot.val());

    // Add each train's data into the table
    $('#trainTable').append(trainData);
    // $('#trainTable > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + firstTrain + "</td><td>" + frequency + "</td></tr>");

     // console log errors
    }, function (errorObject) {
        console.log("ERRORS: " + errorObject.code);
});