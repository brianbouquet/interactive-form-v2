//select form elements
var inputName = document.getElementById('name');
var inputEmail = document.getElementById('mail');
var selectTitle = document.getElementById('title');
var selectSize = document.getElementById('size');
var selectColor = document.getElementById('color');
var selectDesign = document.getElementById('design');
var otherTitle = document.getElementById('other-title');

//declare global variables
var selectColorOptions;

//set the focus to first input
window.onload = function getFocus() {
    inputName.focus();
}

//function to create form element
var createFormElement = (elementName, type, id, name, placeholder) => {
    var element = document.createElement(elementName);
    element.setAttribute("type", type);
    element.id = id;
    element.setAttribute("name", name);
    element.setAttribute("placeholder", placeholder);
    return element;
}

//function to initially hide "Otherther" job title input
var hideOtherTitle = () => {
    otherTitle.hidden = true;
}

//check job title value for "Other" and show/hide input
selectTitle.addEventListener("change", (event) => {
    if (event.target.value == "other") {
        otherTitle.hidden = false;
    } else {
        hideOtherTitle();
    }
});

//function to create "Color" default
var createColorDefault = () => {
    //set "Color" field to "Please select a T-shirt theme" by default
    var colorDefault = document.createElement('option');
    colorDefault.textContent = "Please select a T-shirt theme";
    selectColor.prepend(colorDefault);
    //select all options once default is added
    selectColorOptions = document.querySelectorAll('#shirt-colors option');
    return selectColorOptions;
}

//function to hide "Color" options until theme selected
var hideColorOptions = () => {
    selectColorOptions[0].selected = true;
    for (var i = 0; i < selectColorOptions.length; i++) {
        var optionValue = selectColorOptions[i].value;
        if (optionValue !== "Please select a T-shirt theme") {
            selectColorOptions[i].hidden = true;
        }
    }
}

//function to show/hide "Color" options
var showColorOptions = (optStart, optA, optB, optC) => {
    selectColorOptions[optStart].selected = true;
        for (var i = 0; i < selectColorOptions.length; i++) {
            var optionValue = selectColorOptions[i].value;
            console.log(optionValue);
            if (optionValue == optA || optionValue == optB || optionValue == optC) {
                selectColorOptions[i].hidden = false;
            } else {
                selectColorOptions[i].hidden = true;
            }
        }
}

//add event listener to show colors when design theme selected
selectDesign.addEventListener("change", (event) => {
    //show "JS Puns" theme colors
    var designValue = event.target.value;
    if (designValue == "js puns") {
        showColorOptions(1, "cornflowerblue", "darkslategrey", "gold");
    } else if (designValue == "heart js") {
        showColorOptions(4, "tomato", "steelblue", "dimgrey");
    } else {
        hideColorOptions();
    }
});

//if workshop selected, disable workshops during same time slots
var activities = document.querySelectorAll('.activities input');
console.log(activities);

document.querySelector('.activities').addEventListener('change', (event) => {
    var selected = event.target;
    console.log(selected);
    var selectedTime = event.target.getAttribute('data-day-and-time');
    console.log(selectedTime);
    var selectedCost = event.target.getAttribute('data-cost');
    console.log(selectedCost);
});
//if workshop unselectd, enable workshops

//update conference costs based on selections

hideOtherTitle();
createColorDefault();
hideColorOptions();