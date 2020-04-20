// API key
var apiKey = "76e9ff367a27de5d400ffd75af441c88";

// Adds 5 next 5 day dates to the HTML
var dayOne = moment().add(1, 'day').format(" (M/D/YYYY)");
$("#day-date-1").text(dayOne);
var dayTwo = moment().add(2, 'day').format(" (M/D/YYYY)");
$("#day-date-2").text(dayTwo);
var dayThree = moment().add(3, 'day').format(" (M/D/YYYY)");
$("#day-date-3").text(dayThree);
var dayFour = moment().add(4, 'day').format(" (M/D/YYYY)");
$("#day-date-4").text(dayFour);
var dayFive = moment().add(5, 'day').format(" (M/D/YYYY)");
$("#day-date-5").text(dayFive);

displayCity();
var savedCities = JSON.parse(localStorage.getItem("city")) || [];
if (savedCities.length > 0) {
  searchCity(savedCities[savedCities.length-1]);
}
// Adds Search to HTML
$("#search").on("click", function (event) {

  event.preventDefault();
  var userInput = $("#city-input").val();
  searchCity(userInput);


});

// function color coding  UV index
function getUVColorClass(color) {
  var currentUVIndex = color;
  if (currentUVIndex < 6) {
    return "badge badge-success";
  } else if (currentUVIndex >= 6 && currentUVIndex < 8) {
    return "badge badge-warning";
  } else {
    return "badge badge-danger";
  }
}

//
function displayCity(){
  var savedCities = JSON.parse(localStorage.getItem("city")) || [];
  $("#saved-city").empty();
  savedCities.forEach(city => {
    var cityDiv = $("<div>").text(city).addClass("row");
    $("#saved-city").append(cityDiv);
    cityDiv.on("click", function () {
      searchCity(city);
    });
  });
}

function saveCity(userInput) {
  var savedCities = JSON.parse(localStorage.getItem("city")) || [];
  if (!savedCities.includes(userInput)) {
    savedCities.push(userInput);
  }
  localStorage.setItem("city", JSON.stringify(savedCities));
}

function searchCity(userInput) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial&appid=" + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    if (response.cod === 200) {
      saveCity(userInput);
      displayCity();
    }

    var icon = response.weather[0].icon;
    var imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    var iconImg = $("<img>").attr("src", imgURL);



    $("#weekly-forecast").removeClass("hide");

    // Transfer content to HTML
    $("#city").text(" " + response.name + moment().format(" (M/D/YYYY)"));
    $("#city").addClass("font-weight-bold")
    $("#temperature").text(" " + response.main.temp + " " + String.fromCharCode(176) + "F");
    $("#humidity").text(" " + response.main.humidity + " %");
    $("#wind-speed").text(" " + response.wind.speed + " MPH");

    //Current Weather icon to HTML
    $("#icon-image").html(iconImg);
    $(iconImg).addClass("icon-size");


    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var uvQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

    $.ajax({
      url: uvQueryURL,
      method: "GET"
    }).then(function (response) {
      $("#u-v-index").text(" " + response.current.uvi).addClass(getUVColorClass(response.current.uvi));

      // Adds weekly temps to the HTML
      var dayOneIcon = response.daily[1].weather[0].icon;
      var weeklyURL = "http://openweathermap.org/img/wn/" + dayOneIcon + "@2x.png";
      $("#day-icon-1").attr("src", weeklyURL).html("#day-icon-1").addClass("icon-size");
      $("#day-temp-1").text(response.daily[1].temp.max + " °F");
      $("#day-hum-1").text(response.daily[1].humidity + " %");

      // Day 2
      var dayTwoIcon = response.daily[2].weather[0].icon;
      weeklyURL = "http://openweathermap.org/img/wn/" + dayTwoIcon + "@2x.png";
      $("#day-icon-2").attr("src", weeklyURL).html("#day-icon-2").addClass("icon-size");
      $("#day-temp-2").text(response.daily[2].temp.max + " °F");
      $("#day-hum-2").text(response.daily[2].humidity + " %");

      // Day 3
      var dayThreeIcon = response.daily[3].weather[0].icon;
      weeklyURL = "http://openweathermap.org/img/wn/" + dayThreeIcon + "@2x.png";
      $("#day-icon-3").attr("src", weeklyURL).html("#day-icon-3").addClass("icon-size");
      $("#day-temp-3").text(response.daily[3].temp.max + " °F");
      $("#day-hum-3").text(response.daily[3].humidity + " %");

      // Day 4
      var dayFourIcon = response.daily[4].weather[0].icon;
      weeklyURL = "http://openweathermap.org/img/wn/" + dayFourIcon + "@2x.png";
      $("#day-icon-4").attr("src", weeklyURL).html("#day-icon-4").addClass("icon-size");
      $("#day-temp-4").text(response.daily[4].temp.max + " °F");
      $("#day-hum-4").text(response.daily[4].humidity + " %");

      // Day 5
      var dayFiveIcon = response.daily[5].weather[0].icon;
      weeklyURL = "http://openweathermap.org/img/wn/" + dayFiveIcon + "@2x.png";
      $("#day-icon-5").attr("src", weeklyURL).html("#day-icon-5").addClass("icon-size");
      $("#day-temp-5").text(response.daily[2].temp.max + " °F");
      $("#day-hum-5").text(response.daily[2].humidity + " %");

    });

  });

}