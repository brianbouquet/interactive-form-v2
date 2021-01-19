//select form elements
var inputName = document.getElementById('name');
var inputEmail = document.getElementById('mail');
var selectTitle = document.getElementById('title');
var selectSize = document.getElementById('size');

//set the focus to first input
window.onload = function getFocus() {
    inputName.focus();
}