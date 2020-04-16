var apiKey = "76e9ff367a27de5d400ffd75af441c88";


$("#search").on("click", function (event) {

  event.preventDefault();
  var searchedCity = $("#city-input").val();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=imperial&appid=" + apiKey;

  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var icon = response.weather[0].icon;
    var imgURL = "https:openweathermap.org/img/wn/" + icon + "@2x.png"
    var iconImg = $("<img>").attr("src", imgURL);


    // Transfer content to HTML
    $("#city").text(" " + response.name + moment().format(" (M/D/YYYY)"));
    $("#city").addClass("font-weight-bold")
    $("#temperature").text(" " + response.main.temp + " " + String.fromCharCode(176) + "F");
    $("#humidity").text(" " + response.main.humidity + " %");
    $("#wind-speed").text(" " + response.wind.speed+ " MPH");

    //Current Weather icon to HTML
    $("#icon-image").html(iconImg);
    $(iconImg).addClass("icon-size");

        
    var lat = response.coord.lat;
    var lon = response.coord.lon;    
    var uvQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    $.ajax({
      url: uvQueryURL,
      method: "GET"
    }).then(function (response) {
      $("#u-v-index").text(response.current.uvi);

    });


  });

});