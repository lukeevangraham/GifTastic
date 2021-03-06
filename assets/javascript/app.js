// Initial array of desginations
var destinations = [
  "Eiffel Tower",
  "Big Ben",
  "Vatican",
  "Charles Bridge",
  "Machu Picchu",
  "Colosseum",
  "Giza Pyramids",
  "Leaning Tower of Pisa",
  "Golden Gate Bridge",
  "Taj Mahal",
  "Great Wall of China",
  "Sydney Opera House",
  "Stonehenge",
  "Burj Khalifa",
  "The Kremlin",
  "Berlin Wall",
  "Jungfrau",
  "Chichen Itza",
  "Statue of Liberty",
  "Hagia Sophia"
];
let offset = 0;
let lastSelectedDestination;
var appendOrHTML = "html";
let wikipediaResult;
let favorites;
let firstFavorite = false;

function add10() {
  appendOrHTML = "append";
  offset += 10;
  displayDestinationInfo(offset);
}

function favoriteClick(gifFaved) {
  console.log("FAVE: ", gifFaved);
  $("#favorites").addClass(`p-3`)
if (firstFavorite === false) {
  $("#favorites").append(`<h5 class='col-12 p-0'>Favorites:</h5>`)
  firstFavorite = true;
}
  $("#favorites").append(`<div class="col-4 p-0"><img src="` + gifFaved + `" alt="" class="img-fluid"></div>`)
}

function getWikipedia(chosenDest) {
  $.ajax({
    url:
      `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&titles=` +
      chosenDest +
      `&prop=pageterms|pageprops|pageimages|pageterms|extracts`,
    method: "GET"
  }).then(wikiResponse => {
    const wikiPageNum = Object.keys(wikiResponse.query.pages);
    wikiData = wikiResponse.query.pages[wikiPageNum];

    $("#wikipedia-form").empty();
    $("#wikipedia-form").addClass(`myClass p-3 `);
    $("#wikipedia-form").append(`<h5>` + wikiData.title + `</h5>`);
    let shortenedExtract = wikiData.extract;
    $("#wikipedia-form").append(shortenedExtract.split(`</p>`, 3));
  });
}

// displayDestinationInfo function re-renders the HTML to diplay the appropriate content
function displayDestinationInfo(currentOffset) {
  var chosenDestination = $(this).attr("data-name");

  if ($(this).attr("data-name") === undefined) {
    chosenDestination = lastSelectedDestination;
    $(".add10Button").remove();
  } else {
    appendOrHTML = "html";
    $("#destinations").empty();
    currentOffset = 0;
    lastSelectedDestination = $(this).attr("data-name");
    chosenDestination = $(this).attr("data-name");
    $(".add10Button").remove();
    getWikipedia($(this).attr("data-name"));
  }

  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    chosenDestination +
    "&api_key=6NPx7xPqPCxdQFVMsaIiTbtvP0EpnX8k&limit=10&offset=" +
    currentOffset;

  // // Creating an AJAX call for the specific destination button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    results.forEach(function(result) {
      // Creating a div to hold the destination
      var destDiv = $("<div class='destination row'>");

      // Storing the rating image of gif
      var rating = result.rating;

      // Creating a paragraph tag with the result item's rating
      var p = $("<div class='col-8 pb-4'>").text("Rating: " + rating);

      var icons = $(`<div class='col-4 d-flex flex-row-reverse'>`).text("");

      p.prepend(result.title.toUpperCase() + ` <br>`);

      let divCol = $(`<div class='col-12'>`);

      // Creating an image tag
      var staticIMG = $("<img>");

      // Giving the image tag a src attribute of a property pulled off the result item
      staticIMG.attr("src", result.images.fixed_height_still.url);

      // Give the image tag attributes for still, animate and state
      staticIMG.attr("data-still", result.images.fixed_height_still.url);
      staticIMG.attr("data-animate", result.images.fixed_height.url);
      staticIMG.attr("data-state", "still");
      staticIMG.attr("class", "gif rounded img-fluid");

      icons.append(
        `<button class="btn btn-dark download-btn mr-0" onclick="favoriteClick('` + result.images.fixed_width_small_still.url + `')"><i class="fas fa-star"></i></button>
      <a href="#" onclick="download_img(this, '` +
          result.images.fixed_height.url +
          `')"><button class="btn btn-dark download-btn"><i class="fas fa-download"></i></button></a>`
      );

      // Appending the paragraph and staticIMG we created to the "destDiv" div we created
      staticIMG.appendTo(divCol);
      destDiv.append(divCol);
      // destDiv.append(`<div class='row'>`)
      // destDiv.append(`<div class='row'>`)
      destDiv.append(p);
      destDiv.append(icons);

      // Prepending the destDiv to the "#destinations" div in the HTML
      //   if (appendOrHTML === "append") {
      $("#destinations").addClass("p-3");
      $("#destinations").append(destDiv);
      //   } else {
      // $("#destinations").html(destDiv);
      //   }
    });

    $("#destinations").append(
      `<button class="add10Button btn btn-dark">Add 10 more`
    );

    $(".add10Button").on("click", add10);
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
    var button = $("<button>");
    // Adding a class of dest-btn to our button
    button.addClass("dest-btn btn btn-dark m-1");
    // Adding a data-attribute
    button.attr("data-name", destination);
    // Providing the initial button text
    button.text(destination);
    // Adding the button to the destination-button div
    $("#destination-buttons").append(button);
  });
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

// Function to add destination into array and create button
function addDestination() {
  event.preventDefault();
  var newDestination = $("#destination-input").val();
  destinations.push(newDestination);
  renderButtons();
}

function download_img(e, link) {
  var image = new Image();
  image.crossOrigin = "anonymous";
  image.src = link;
  image.onload = function() {
    var canvas = document.createElement("canvas");
    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
    canvas.getContext("2d").drawImage(this, 0, 0);
    var blob;
    // ... get as Data URI
    if (image.src.indexOf(".jpg") > -1) {
      blob = canvas.toDataURL("image/jpeg");
    } else if (image.src.indexOf(".png") > -1) {
      blob = canvas.toDataURL("image/png");
    } else if (image.src.indexOf(".gif") > -1) {
      blob = canvas.toDataURL("image/gif");
    } else {
      blob = canvas.toDataURL("image/png");
    }
    tempbtn = document.createElement("a");
    tempbtn.href = blob;
    tempbtn.download = "image.gif"; // or define your own name.
    tempbtn.click();
    tempbtn.remove();
  };
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
