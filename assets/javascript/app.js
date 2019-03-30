// Initial array of desginations
var destinations = ["Eiffel Tower", "Big Ben", "Vatican", "Charles Bridge", "Machu Picchu", "Colosseum", "Giza Pyramid", "Leaning Tower of Pisa", "Golden Gate Bridge", "Taj Mahal", "Great Wall of China", "Sydney Opera House", "Stonehenge", "Burj Khalifa", "The Kremlin", "Berlin Wall", "Jungfrau", "Chichen Itza", "Statue of Liberty", "Hagia Sophia"]

// displayDestinationInfo function re-renders the HTML to diplay the appropriate content
function displayDestinationInfo() {
    var chosenDestination = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + chosenDestination + "&api_key=6NPx7xPqPCxdQFVMsaIiTbtvP0EpnX8k&limit=10";

    // Creating an AJAX call for the specific destination button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;

        results.forEach(function(result) {
            // Creating a div to hold the destination
            var destDiv = $("<div class='destination'>");

            // Storing the rating image of gif
            var rating = result.rating;
            
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var staticIMG = $("<img>");

            // Giving the image tag a src attribute of a property pulled off the result item
            staticIMG.attr("src", result.images.fixed_height_still.url);

            // Give the image tag attributes for still, animate and state
            staticIMG.attr("data-still", result.images.fixed_height_still.url);
            staticIMG.attr("data-animate", result.images.fixed_height.url);
            staticIMG.attr("data-state", "still");
            staticIMG.attr("class", "gif");

            // Appending the paragraph and staticIMG we created to the "destDiv" div we created
            destDiv.append(staticIMG)
            destDiv.append(p);

            // Prepending the destDiv to the "#destinations" div in the HTML
            $("#destinations").prepend(destDiv);
        })

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
    })
}

// Function to switch gif state between animated and still
function switchGifState() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

// // This .on("click") function will trigger the AJAX Call
// $("addDestination").on("click", function(event) {
// event.preventDefault();


// Function to add destination into array and create button
function addDestination() {
    var newDestination = $("#destination-input").val();
    destinations.push(newDestination);
    renderButtons();
}

// // Grab the text from the input box

// // Now construct the query URL
// var queryURL = 

// })

// Adding a click event listener to all elements with a class of "dest-btn"
$(document).on("click", ".dest-btn", displayDestinationInfo);

// Adding a click event listener to all elements  with a class of "gif"
$(document).on("click", ".gif", switchGifState);

// Adding a click event listener to the "Submit" button
$(document).on("click", "#addDestination", addDestination);


// Calling the renderButtons fuction to display the inistial list of movies
renderButtons();