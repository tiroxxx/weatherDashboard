$(document).ready(function () {


    // hooking up my form elements
    var formEl = $("#formy");
    var formInput = $("#form-input");
    var formButton = $("#form-button");
    // hooking into the col where the form is
    var formColumnEl = $("#form-space");
    var buttonsEl = $("#button-area")

    // coordinates of the city
    var cityLon;
    var cityLat;

    // if theres something on local storage, get those on the page
    if (JSON.parse(localStorage.getItem("city-name")) !== null) {
        init();
    }

    function addButton(city) {
        // create a button and add attributes for referencing and styling
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
        // clear space under the form
        buttonsEl.empty();
        var temp = [];
        // get the cities stored in local storage
        var temp = JSON.parse(localStorage.getItem("city-name"));
        console.log(temp);

        var arrLength = temp.length;
        // if the length of the array is bigger than 7, make it 7
        if (arrLength > 7) {
            arrLength = 7;
        }
        // loop through the cities we got from local storage
        for (var i = 0; i < arrLength; i++) {
            addButton(temp[i]);
        };
    }

    // adding buttons with the name of the city being searched
    formEl.submit(function (event) {
        event.preventDefault();
        // if no input is typed, alert
        if (formInput.val() === "") {
            alert("Cannot leave input blank");
            return;
        }

        currentWeather(formInput.val());
    });

    // my API key
    var APIKey = "fe4bb57179968f6fb5c640fef4d924e0"

    function currentWeather(city) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
        // running AJAX call to the OpenWeaterMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // once the info is retrieved from api run this
            .then(function (response) {
                // object with all the city info needed
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

                var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey + "&units=imperial";

                $.ajax({
                    url: queryURL2,
                    method: "GET"
                })

                    .then(function (response) {
                        if (JSON.parse(localStorage.getItem("city-name")) == null) {
                            var cityArr = [];
                            // add the user city input to store
                            cityArr.push(cityInfo.name);
                            localStorage.setItem("city-name", JSON.stringify(cityArr));
                            // place to store weather icon url
                            var weatherIcon = "https:///openweathermap.org/img/w/" + cityInfo.icon + ".png";
                            appendWeather(cityInfo.name, cityInfo.temp, cityInfo.humidity, cityInfo.windSpeed, weatherIcon, response.value);
                            init();
                        }
                        else {
                            var cityArr = JSON.parse(localStorage.getItem("city-name"));
                            cityArr.push(cityInfo.name);
                            localStorage.setItem("city-name", JSON.stringify(cityArr));
                            var weatherIcon = "https:///openweathermap.org/img/w/" + cityInfo.icon + ".png";
                            appendWeather(cityInfo.name, cityInfo.temp, cityInfo.humidity, cityInfo.windSpeed, weatherIcon, response.value);
                            init
                        }
                    })
                // CALL function to get forecast
                getForecast(city);
            });
    }

    function getForecast(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                console.log(response);
                // 
                for (var i = 0; i != response.list.length; i = i + 8) {
                    // storing all info needed in an object
                    var cityInfo = {
                        date: response.list[i].dt_txt,
                        temp: response.list[i].main.temp,
                        humidity: response.list[i].main.humidity,
                        icon: response.list[i].weather[0].icon
                    }

                    var weatherIcon = "https:///openweathermap.org/img/w/" + cityInfo.icon + ".png";
                    // put the 5 day forecast on the page
                    appendForecast(weatherIcon, cityInfo.temp, cityInfo.humidity);

                }
            });
    }

    function appendWeather(city, temp, humidity, windSpeed, icon, uvNum) {
        // creating all the elements needed to display city weather info on the page
        var cityEL = $("<h1>");
        cityEL.text(city);
        var tempEl = $("<p>");
        tempEl.text("Temperature:" + temp + "F");
        var humidityEl = $("<p>");
        humidityEl.text("Humidity: " + humidity);
        var windEl = $("<p>");
        windEl.text("Wind Speed: " + windSpeed + "mph");
        var uvEl = $("<p>");
        uvEl.text("UV Index: " + uvNum);
        var weatherIcon = $("<img>");
        weatherIcon.attr("src", icon);

        $(".city-info").append(cityEL, tempEl, humidityEl, windEl, uvEl, weatherIcon);
    }

    function appendForecast(icon, temp, humidity) {
        // creating columns for each day
        var forecastDiv = $("<div>");
        forecastDiv.addClass("col-sm-2");

        // creating all of the elements for the forecast
        var weatherIcon = $("<img>");
        weatherIcon.attr("src", icon);
        var weatherTemp = $("<p>");
        weatherTemp.text("Temperature: " + temp + "F");
        var weatherHum = $("<p>");
        weatherHum.text("Humidity: " + humidity);

        $(".forecast-area").append(forecastDiv);
        forecastDiv.append(weatherIcon, weatherTemp, weatherHum);

    }
});



