//Initial array of gifs	
$(document).ready(function() {

    var gifArr = ["eye roll", "lol", "shrugs", "wink", "smile"];	
  
    //  create array buttons
    function renderButtons(){
        $('#buttons-view').empty();
  
        for (var i = 0; i < gifArr.length; i++) {
            var a = $('<button>');
            a.addClass('giphy');
            a.attr('data-name', gifArr[i]);
            a.text(gifArr[i]);
            $('#buttons-view').append(a);
        }
    }    
    renderButtons();
  
  $(document).on('click', '.giphy', function() {
  
      var searchedGif = $(this).html(); 
      // console.log(searchedGif);
  
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchedGif + "&api_key=wLblm7yDyFoA5Am3Mb57uSYm2CRmsUUo&limit=10";
      // console.log(queryURL);
  
      // Creating an AJAX call for the specific gif button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
  
        var results = response.data;
         
        //$('#gifs-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                          // console.log(imageView);  
        
        var gifDiv = $("<div class= 'wrapper'>");
        var rating = results[j].rating;
        var displayRated= $('<p>').text("Rating: " + rating);

          var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                      gifImage.attr('data-state', 'still');
                      gifImage.on('click', playGif);
  
          gifDiv.append(gifImage);
          gifDiv.append(displayRated);


          $('#gifs-view').prepend(gifDiv);
    } 
  
  }); 
  
          //function to stop and animate gifs
          function playGif() { 
                      var state = $(this).attr('data-state');
                      // console.log(state);
                   if (state == 'still'){
                       $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                   } else{
                       $(this).attr('src', $(this).data('still'));
                       $(this).attr('data-state', 'still');
                      }
  
                  } 
  
        });  
  
            //adding new button to array
          $(document).on('click', '#add-gif', function(){
              if ($('#gif-input').val().trim() == ''){
                alert('Input can not be left blank');
             }
             else {
              var giphies = $('#gif-input').val().trim();
              gifArr.unshift(giphies);
              $('#gif-input').val('');
              renderButtons();
              return false;
  
              }
  
          });
                        
}); 


  