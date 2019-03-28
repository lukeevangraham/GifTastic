// Initial array of desginations
var destinations = ["Eiffel Tower", "Big Ben", "Vatican", "Charles Bridge", "Machu Picchu", "Colosseum", "Giza Pyramid", "Leaning Tower of Pisa", "Golden Gate Bridge", "Taj Mahal", "Great Wall of China", "Sydney Opera House", "Stonehenge", "Burj Khalifa", "The Kremlin", "Berlin Wall", "Jungfrau", "Chichen Itza", "Statue of Liberty", "Hagia Sophia"]

// displayDestinationInfo function re-renders the HTML to diplay the appropriate content
function displayDestinationInfo() {
    var destination = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + destination + "&api_key=6NPx7xPqPCxdQFVMsaIiTbtvP0EpnX8k&limit=10";

    // Creating an AJAX call for the specific destination button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        // console.log(results);

        results.forEach(function(result) {
            // Creating a div to hold the destination
            var destDiv = $("<div class='destination'>");

            // Storing the rating image of gif
            var rating = result.rating;
            
            var p = $("<p>").text("Rating: " + rating);
            console.log(p);

            // Storing the static gif URL
            var staticIMG = $("<img>");
            staticIMG.attr("src", result.images.fixed_height.url);

            destDiv.prepend(p);
            destDiv.prepend(staticIMG)

            $("#destinations").prepend(destDiv);

        })

        // var destinationDiv = $("<div class='destination>");


    });


}



// Function for displaying destination data
function renderButtons() {

    // delete buttons prior to adding new buttons
    $("#destination-buttons").empty();

    // Looping through the array of destinations
    destinations.forEach(function(destination) {
        // var button = $('<button>' + destination + '</button>');


        // Create a beginning and ending button tag
        var button = $('<button>');
        // Adding a class of dest-btn to our button
        button.addClass("dest-btn");
        // Adding a data-attribute
        button.attr("data-name", destination);
        // Providing the initial button text
        button.text(destination);
        // Adding the button to the destination-button div
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

// Adding a click event listener to all elements with a class of "dest-btn"
$(document).on("click", ".dest-btn", displayDestinationInfo);


// Calling the renderButtons fuction to display the inistial list of movies
renderButtons()