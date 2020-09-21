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
    newButton.addClass("btn-light");
    newButton.attr("value", cityName);

    buttonsEl.append(newButton);

    ajaxCall(cityName);



});

// my API key
var APIKey = "fe4bb57179968f6fb5c640fef4d924e0"
// url to get city's coordinates
var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=&appid=" + APIKey;
var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=&lon=&exclude=&appid=" + APIKey;




buttonsEl.on("click", function () {
    console.log($(this));
    console.log($(this).attr("value"));
    // ajaxCall($(this).attr("data-city"));


});

function ajaxCall(city) {

    queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
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

            queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=&appid=" + APIKey;


        });

    // $.ajax({
    //     ulr: queryURL2,
    //     method: "GET"
    // })

    //     .then(function (response) {

    //         console.log(response);

    //     })

}