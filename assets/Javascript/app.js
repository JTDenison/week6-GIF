$(document).ready(function() {
    // An array of supa heros
    var heros = ["Wolverine", "Cable", "Deadpool", "Cyclops", "Magneto", "Punisher", "Thanos", "Venom", "Hulk", "Thor"];
    // Func for assigning  and displaying gif buttons
    function displayGifButtons() {
        $("#gifButtonsView").empty(); // make a div and give it properties
        for (var i = 0; i < heros.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("heroAction");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", heros[i]);
            gifButton.text(heros[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new hero button
    function addNewButton() {
        $("#addGif").on("click", function() {
            var heroAction = $("#heroAction-input").val().trim();
            if (heroAction == "") {
                return false; // added so user cannot add a blank button
            }
            heros.push(heroAction);

            displayGifButtons(); //call func for displaying  gifs
            return false;
        });
    }
    // Function that displays all 10 gifs 
    //ajax calls api
    function displayGifs() {
        var heroAction = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + heroAction + "&api_key=dc6zaTOxFJmzC&limit=10";
        // console.log(queryURL); 
        $.ajax({
                url: queryURL,
                method: 'GET'
            }) // USE .done
            .done(function(response) {
                console.log(response);
                $("#gifsView").empty(); // dumping the div d
                var results = response.data; //shows results of gifs
                if (results == "") {
                    alert("There isn't a gif for this selected button"); //addded a no gifs found ... for my inaverdant typo
                }
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>"); //div for the gifs to go inside
                    gifDiv.addClass("gifDiv");
                    // GET gif ratings
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    var gifImage = $("<img>");
                    //Set gif "still"/defauult urls and size
                    //using data and state
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url); // default gif call
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); // still
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url); // animate 
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    // adding div of gifs to gifsView div ----  limit 10
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }
    //changing from still to animate on the clicks
    //USE DOCUMENT.on         //if else
    $(document).on("click", ".heroAction", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    // reset them scrubs
    function resetScrubs() {
        $("#removeGif").on("click", function() {
            heros.pop(heroAction);
            displayGifButtons();
        });
    }
    //calling functions
    displayGifButtons(); // func calling list of gifs created
    addNewButton(); // func for adding a new button
    resetScrubs(); // func to reset
});
