// API key
var apiKey = "76e9ff367a27de5d400ffd75af441c88";

// Adds 5 next 5 day dates to the HTML
var dayOne = moment().add(1, 'day').format(" (M/D/YYYY)");
$("#day-one-date").text(dayOne);

var dayTwo = moment().add(2, 'day').format(" (M/D/YYYY)");
$("#day-two-date").text(dayTwo);

var dayThree = moment().add(3, 'day').format(" (M/D/YYYY)");
$("#day-three-date").text(dayThree);

var dayFour = moment().add(4, 'day').format(" (M/D/YYYY)");
$("#day-four-date").text(dayFour);

var dayFive = moment().add(5, 'day').format(" (M/D/YYYY)");
$("#day-five-date").text(dayFive);

// Adds Search to HTML
$("#search").on("click", function (event) {

  event.preventDefault();
  var searchedCity = $("#city-input").val();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=imperial&appid=" + apiKey;


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var icon = response.weather[0].icon;
    var imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    var iconImg = $("<img>").attr("src", imgURL);


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
      $("#u-v-index").text(" " + response.current.uvi);

      // Adds weekly temps to the HTML
      var dayOneIcon = response.daily[1].weather[0].icon;
      var weeklyURL = "http://openweathermap.org/img/wn/" + dayOneIcon + "@2x.png";
      $("#day-one-icon").attr("src", weeklyURL).html("#day-one-icon").addClass("icon-size");
      $("#day-one-temp").text(response.daily[1].temp.max + " °F");
      $("#day-one-hum").text(response.daily[1].humidity + " %");

      // Day 2
      var dayTwoIcon = response.daily[2].weather[0].icon;
      weeklyURL = "http://openweathermap.org/img/wn/" + dayTwoIcon + "@2x.png";
      $("#day-two-icon").attr("src", weeklyURL).html("#day-two-icon").addClass("icon-size");
      $("#day-two-temp").text(response.daily[2].temp.max + " °F");
      $("#day-two-hum").text(response.daily[2].humidity + " %");

      // Day 3
      var dayThreeIcon = response.daily[3].weather[0].icon;
      weeklyURL = "http://openweathermap.org/img/wn/" + dayThreeIcon + "@2x.png";
      $("#day-three-icon").attr("src", weeklyURL).html("#day-three-icon").addClass("icon-size");
      $("#day-three-temp").text(response.daily[3].temp.max + " °F");
      $("#day-three-hum").text(response.daily[3].humidity + " %");

      // Day 4
      var dayFourIcon = response.daily[4].weather[0].icon;
      weeklyURL = "http://openweathermap.org/img/wn/" + dayFourIcon + "@2x.png";
      $("#day-four-icon").attr("src", weeklyURL).html("#day-four-icon").addClass("icon-size");
      $("#day-four-temp").text(response.daily[4].temp.max + " °F");
      $("#day-four-hum").text(response.daily[4].humidity + " %");

      // Day 5
      var dayFiveIcon = response.daily[5].weather[0].icon;
      weeklyURL = "http://openweathermap.org/img/wn/" + dayFiveIcon + "@2x.png";
      $("#day-five-icon").attr("src", weeklyURL).html("#day-five-icon").addClass("icon-size");
      $("#day-five-temp").text(response.daily[2].temp.max + " °F");
      $("#day-five-hum").text(response.daily[2].humidity + " %");

    });

  });

});

function getUVColorClass() {
  var currentUVIndex = response.current.uvi;
  if (currentUVIndex < 6) {
    return "badge badge-success";
  } else if (currentUVIndex < 8) {
    return "badge badge-warning";
  } else {
    return "badge badge-danger";
  }
}