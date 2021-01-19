//select form elements
var inputName = document.getElementById('name');
var inputEmail = document.getElementById('mail');
var selectTitle = document.getElementById('title');
var selectSize = document.getElementById('size');
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
