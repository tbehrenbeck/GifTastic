$(document).ready(function () {

    var gifsArray = ["Happy", "Mad", "Laugh", "Side Eye"];

    function renderButtons() {
        $("#gif-buttons").empty();
        for (i = 0; i < gifsArray.length; i++) {
            $("#gif-buttons").append("<button class='btn btn-success' data-gif='" + gifsArray[i] + "'>" + gifsArray[i] + "</button>");
        }
    }

    renderButtons();
    
    $("#add-gif").on("click", function() {
        event.preventDefault();
        var newGif = $("#gif-input").val().trim();
        gifsArray.push(newGif);
        renderButtons();
        return;
    })
});





function gifButtonClicked() {
    var userInput = $('#gif-input').val();
    searchGif(userInput);
}



function searchGif(gifName) {
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=wLblm7yDyFoA5Am3Mb57uSYm2CRmsUUo';

    $.ajax({
        url: queryURL,
        type: 'GET',
    })
        .then(function (response) {
            displayGif(response);
        })
}


function displayGif(response) {
    $('#gifs').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:auto; height:auto">';

        // image = '<div class="col-md-4">' + image + "</div>";
        $('#gifs').append(image);
    }

    $('.movImage').on('click', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}

$(document).on("click", ".show", searchGif);