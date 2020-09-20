// hooking up my form elements
var formEl = $("#formy");
var formInput = $("#form-input");
var formButton = $("#form-button");
// hooking into the col where the form is
var formColumnEl = $("#form-space");

var buttonsEl = $("btn-group-vertical");


// adding buttons with the name of the city being searched
formEl.submit(function(event) {
    event.preventDefault();


    var newButton = $("<button>");
    newButton.attr("data-city", formInput.val());
    newButton.text(formInput.val());
    newButton.addClass("btn");
    newButton.addClass("btn-light");

    formEl.append(newButton);

})