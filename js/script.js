//select form elements
var inputName = document.getElementById('name');
var inputEmail = document.getElementById('mail');
var selectTitle = document.getElementById('title');
var selectSize = document.getElementById('size');
var selectColor = document.getElementById('color');
var selectDesign = document.getElementById('design');
var otherTitle = document.getElementById('other-title');

//set the focus to first input
window.onload = function getFocus() {
    inputName.focus();
}

//function to create form element
function createFormElement(elementName, type, id, name, placeholder) {
    var element = document.createElement(elementName);
    element.setAttribute("type", type);
    element.id = id;
    element.setAttribute("name", name);
    element.setAttribute("placeholder", placeholder);
    return element;
}

//initially hide "other" job title input
otherTitle.hidden = true;

//check job title value for other and show/hide input
selectTitle.addEventListener("change", (event) => {
    if (event.target.value == "other") {
        otherTitle.hidden = false;
    } else {
        otherTitle.hidden = true;
    }
});

//set "Color" field to "Please select a T-shirt theme" by default
var colorDefault = document.createElement('option');
colorDefault.textContent = "Please select a T-shirt theme";
selectColor.prepend(colorDefault);
var selectColorOptions = document.querySelectorAll('#shirt-colors option');
selectColorOptions[0].selected = true;

//hide "Color" options
for (var i = 0; i < selectColorOptions.length; i++) {
    var optionValue = selectColorOptions[i].value;
    if (optionValue !== "Please select a T-shirt theme") {
        selectColorOptions[i].hidden = true;
    }
}

//add event listener to show colors when design theme selected
selectDesign.addEventListener("change", (event) => {
    //show "JS Puns" theme colors
    var designValue = event.target.value;
    if (designValue == "js puns") {
        selectColorOptions[1].selected = true;
        for (var i = 0; i < selectColorOptions.length; i++) {
            var optionValue = selectColorOptions[i].value;
            console.log(optionValue);
            if (optionValue == "cornflowerblue" || optionValue == "darkslategrey" || optionValue == "gold") {
                selectColorOptions[i].hidden = false;
            } else {
                selectColorOptions[i].hidden = true;
            }
        }
    } else if (designValue == "heart js") {
        selectColorOptions[4].selected = true;
        for (var i = 0; i < selectColorOptions.length; i++) {
            var optionValue = selectColorOptions[i].value;
            console.log(optionValue);
            if (optionValue == "tomato" || optionValue == "steelblue" || optionValue == "dimgrey") {
                selectColorOptions[i].hidden = false;
            } else {
                selectColorOptions[i].hidden = true;
            }
        }
    } else {
        selectColorOptions[0].selected = true;
        for (var i = 0; i < selectColorOptions.length; i++) {
            var optionValue = selectColorOptions[i].value;
            if (optionValue !== "Please select a T-shirt theme") {
                selectColorOptions[i].hidden = true;
            }
        }
    }
});

// for (var i = 0; i < selectColorOptions.length; i++) {
//     var optionValue = selectColorOptions[i].value;
//     console.log(optionValue);
    // if (optionValue == null) {
    //     selectColorOptions[i].hidden = true;
    // } else {
    //     selectColorOptions[i].hidden = false;
    // }
//}

// selectDesign.addEventListener("change", (event) => {
    
// });

