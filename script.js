// hooking up my form elements
var formEl = $("#formy");
var formInput = $("#form-input");
var formButton = $("#form-button");
// hooking into the col where the form is
var formColumnEl = $("#form-space");

var buttonsEl = $("#button-area");
// city name taken from user
var cityName

// adding buttons with the name of the city being searched
formEl.submit(function (event) {
    event.preventDefault();
    // city name taken from user
    cityName = formInput.val();
    var newButton = $("<button>");
    newButton.attr("data-city", cityName);
    newButton.attr("type", "button");
    newButton.text(cityName);
    newButton.addClass("btn");
    newButton.addClass("btn-light");

    buttonsEl.append(newButton);

})

// my API key
var APIKey = "9d222a95ad8abb11aa3604f18c12a818"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=&appid=" + APIKey;




$(buttonsEl).on("click", function () {
    queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + cityName + "&appid=" + APIKey;
    // running AJAX call to the OpenWeaterMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {

            console.log(queryURL);
            console.log(response);




        });

});