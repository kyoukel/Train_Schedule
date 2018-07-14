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

// Create a reference to the database
var trainData = firebase.database();

// Targets button id #addTrain & gets the form data and pushes it to the firebase database
$("#addTrain").on("click",function() {
    // gets user input from form
    trainName = $("#trainNameInput").val().trim();
    // console.log(trainName);
    destination = $("#destinationInput").val().trim();
    // console.log(destination);
    firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    // console.log(firstTrain);
    frequency = $("#frequencyInput").val().trim();
    // console.log(frequency);

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    // push info to firebase
    // database.ref().push(newTrain);
    trainData.ref().push(newTrain);

    // Alert
    alert("Train added successfully!");

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
})

// Create Firebase event for adding new train schedules to the database and a row in the html when a user adds an entry
trainData.ref().on("child_added", function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

   var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
   var minutes = frequency - remainder;
   var arrival = moment().add(minutes,"m").format("hh:mm A");

   console.log(remainder);
   console.log(minutes);
   console.log(arrival);

    $("trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td><tr>");
})