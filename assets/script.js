var apiKey = "76e9ff367a27de5d400ffd75af441c88";


$("#search").on("click", function(event) {

    event.preventDefault();
    var searchedCity = $("#city-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apiKey;
    
        $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
        $("#city").text("City : " + response.name + moment().format(" (M/D/YYYY)"));

      });

});

