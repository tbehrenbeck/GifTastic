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
    });

    $("button").on("click", function () {
		var gif = $(this).attr("data-gif");
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q= ' + gif + ' &api_key=wLblm7yDyFoA5Am3Mb57uSYm2CRmsUUo&limit=5'
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data
            $("#gifs").empty();
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var gifImg = $("<img>");

				gifImg.attr("src", results[i].images.original_still.url);
				gifImg.attr("data-still", results[i].images.original_still.url);
				gifImg.attr("data-animate", results[i].images.original.url);
				gifImg.attr("data-state", "still");
				gifImg.attr("class", "gif");
				gifDiv.append(p);
				gifDiv.append(gifImg);
				$("#gifs").append(gifDiv);
            }
        })

    })

    function animation(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
    }
    
	$(document).on("click", ".gif", animation);

})