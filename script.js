$(document).ready(function () {


    // hooking up my form elements
    var formEl = $("#formy");
    var formInput = $("#form-input");
    var formButton = $("#form-button");
    // hooking into the col where the form is
    var formColumnEl = $("#form-space");

    // coordinates of the city
    var cityLon;
    var cityLat;
    // initialize page
    init();

    function addButton(city) {
        // create a button and add attributes for each city
        var newButton = $("<button>");
        newButton.attr("type", "button");
        newButton.text(city);
        newButton.addClass("btn");
        newButton.addClass("button");
        newButton.addClass("btn-light");
        newButton.attr("data-city", city);
        // append the button to the page
        buttonsEl.append(newButton)

    }

    function init() {
        // get the cities stored in local storage
        var temp = JSON.parse(localStorage.getItem("city-name"));
        // check if theres anything stored
        if (temp !== null) {
            cityName = temp;
        }

        var length = cityName.length;
        // if the length of the array is bigger than 7, make it 7
        if (length > 7) {
            length = 7;
        }
        // loop through the cities we got from local storage
        for (var i = 0; i < length; i++) {
            
            addButton(cityName[i]);
        };
    }

    // adding buttons with the name of the city being searched
    formEl.submit(function (event) {
        event.preventDefault();
        // if no input is typed, alert
        if (formInput.val() === "") {
            alert("Cannot leave it blank");
            return;
        }

        // city name taken from user
        cityName.unshift(formInput.val());
        // store that city in local storage
        localStorage.setItem("city-name", JSON.stringify(cityName));

        currentWeather(cityName);

    });

    // my API key
    var APIKey = "fe4bb57179968f6fb5c640fef4d924e0"

    function currentWeather(city) {

        var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
        // running AJAX call to the OpenWeaterMap API
        $.ajax({
            url: queryURL1,
            method: "GET"
        })
            // once the info is retrieved from api run this
            .then(function (response) {
                var cityInfo = {
                    name: response.name,
                    temp: response.main.temp,
                    humidity: response.main.humidity,
                    windSpeed: response.wind.speed,
                    icon: response.weather[0].icon
                };
                
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
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&appid=" + APIKey + "&units=imperial";
        $.ajax({
            url: queryURL2,
            method: "GET"
        })

            .then(function (response) {

                console.log(response);



            })

    }


});



