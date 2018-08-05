//Initial array of movies	
$(document).ready(function() {

    var gifArr = ["Happy", "Mad", "Sad", "Side Eye"];	
  
    //  create gifArr array buttons
    function renderButtons(){
      $('#buttons-view').empty();
  
      for (var i = 0; i < gifArr.length; i++) {
              //create all buttons
              var a = $('<button>');
              a.addClass('giphy');
              a.attr('data-name', gifArr[i]);
              a.text(gifArr[i]);
              $('#buttons-view').append(a);
            }
          }    
          renderButtons();
  
  //on button click
  $(document).on('click', '.giphy', function() {
  
      //new variable will log the text data from each button
      var searchedGif = $(this).html(); 
      // console.log(searchedGif);
  
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchedGif + "&api_key=wLblm7yDyFoA5Am3Mb57uSYm2CRmsUUo&limit=10";
      // console.log(queryURL);
  
      // Creating an AJAX call for the specific movie button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
  
        var results = response.data;
          //console.log(results);
          //empties the div before adding more gifs
          $('#gifs-view').empty();
          for ( var j=0; j < results.length; j++) {
                      var imageDiv = $('<div>');
                      var imageView = results[j].images.fixed_height.url;
                      var still = results[j].images.fixed_height_still.url;
                          // console.log(imageView);  
  
          var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                      gifImage.attr('data-state', 'still');
                      $('#gifs-view').prepend(gifImage);
                      gifImage.on('click', playGif);
  
          // Pulling ratings for each movie
          var rating = results[j].rating;
              // console.log(rating);
          var displayRated= $('<p>').text("Rating: " + rating);
          $('#gifs-view').prepend(displayRated);
    } // end for loop
  
  }); // done response
  
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
  
                  } //end of on click function
  
        }); //end of document on click 
  
            //adding new button to array
          $(document).on('click', '#add-gif', function(){
              if ($('#gif-input').val().trim() == ''){
                alert('Input can not be left blank');
             }
             else {
              var movies = $('#gif-input').val().trim();
              gifArr.push(movies);
              $('#gif-input').val('');
              renderButtons();
              return false;
  
              }
  
          });
                        
  
          }); // end click function
  