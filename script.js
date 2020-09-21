// hooking up my form elements
var formEl = $("#formy");
var formInput = $("#form-input");
var formButton = $("#form-button");
// hooking into the col where the form is
var formColumnEl = $("#form-space");

var buttonsEl = $("#button-area");
// city name taken from user
var cityName;
// coordinates of the city
var cityLon;
var cityLat;

// adding buttons with the name of the city being searched
formEl.submit(function (event) {
    event.preventDefault();
    // city name taken from user
    cityName = formInput.val();
    var newButton = $("<button>");
    newButton.attr("type", "button");
    newButton.text(cityName);
    newButton.addClass("btn");
    newButton.addClass("button");
    newButton.addClass("btn-light");
    newButton.attr("data-city", cityName);

    buttonsEl.append(newButton);

    ajaxCall(cityName);



});

// my API key
var APIKey = "fe4bb57179968f6fb5c640fef4d924e0"

$(".button").on("click", function () {
    console.log($(this));
    var dataCity = $(this).attr("data-city");
    console.log(dataCity);
    // ajaxCall($(this).attr("data-city"));


});

function ajaxCall(city) {

    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    // running AJAX call to the OpenWeaterMap API
    $.ajax({
        url: queryURL1,
        method: "GET"
    })

        .then(function (response) {


            console.log(response);
            cityLon = response.coord.lon;
            cityLat = response.coord.lat;

            console.log(cityLon);
            console.log(cityLat);

            // CALL function to get forecast and pass in lat and lon

            getForecast(cityLat, cityLon);



        });



}

function getForecast(lat, lon) {
    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&exclude=&appid=" + APIKey;
    $.ajax({
        url: queryURL2,
        method: "GET"
    })

        .then(function (response) {

            console.log(response);

        })

}
