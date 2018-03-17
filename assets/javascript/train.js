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

// on click event 
// Targets button id #addTrain & gets the form data and pushes it to the firebase database
$("#addTrain").on("click", function (event) {
    
    event.preventDefault();
  
    // gets user input from form
    trainName = $("#trainName").val().trim();
        console.log(trainName);
    destination = $("#destination").val().trim();
        console.log(destination);
    firstTrain = $("#firstTrain").val().trim();
        console.log(firstTrain);
    frequency = $("#frequency").val().trim();
        console.log(frequency);
  
    // push info to firebase
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    });

}); 

// database reference,
// checks for child added activity in database
// then adds data to form table
database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

    // log object to the console.
    console.log(snapshot.val());

    // First Train Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainTime = moment(snapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    // console.log(initialTimeConverted);


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
    trainData.append(`<td>${snapshot.val().trainName}</td>`);
        console.log(snapshot.val());
    trainData.append(`<td>${snapshot.val().destination}</td>`);
        console.log(snapshot.val());
    trainData.append(`<td>${snapshot.val().frequency}</td>`);
        console.log(snapshot.val());

    

});