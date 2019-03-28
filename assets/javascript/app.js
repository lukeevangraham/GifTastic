// Initial array of desginations
var destinations = ["Paris", "London", "Rome", "Prague", "Venice", "Monaco", "Florence", "Budapest", "Vienna", "Nice", "Amboise", "Mont St Michel", "Honfluer", "Lucerne"]

// Function for displaying destination data
function renderButtons() {

    // delete buttons prior to adding new buttons
    $("#destination-buttons").empty();

    // Looping through the array of destinations
    destinations.forEach(function(destination) {
        var button = $('<button>' + destination + '</button>');
        $('#destination-buttons').append(button)
    });

}

// // This .on("click") function will trigger the AJAX Call
// $("addDestination").on("click", function(event) {
// event.preventDefault();

// // Grab the text from the input box
// var destination = $("#destination-input").val();

// // Now construct the query URL
// var queryURL = 

// })

renderButtons()