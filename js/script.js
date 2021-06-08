//declare global variables
var selectColorOptions;
var shirtColors;

//select form elements
var inputName = document.querySelector('#name');
var inputEmail = document.getElementById('mail');
var selectTitle = document.getElementById('title');
var shirtColors = document.querySelector('#shirt-colors');
var selectSize = document.getElementById('size');
var selectColor = document.getElementById('color');
var selectDesign = document.getElementById('design');
var activities = document.querySelector('.activities');
var activityCheckboxes = document.querySelectorAll('.activities input');
var payment = document.querySelector('#payment');
var paymentOptions = document.querySelectorAll('#payment > option');
var creditCard = document.querySelector('.credit-card');
var inputZipcode = document.querySelector('#zip');
var inputCVV = document.querySelector('#cvv');
var inputOtherTitle = document.querySelector('#other-title');

//set the focus to first input
window.onload = () => {
    inputName.focus();
    payment.value = 'credit card';
}

//function to create element
var createElement = (elementName) => {
    var element = document.createElement(elementName);
    return element;
}

//append element to parent element
var appendElement = (element, parentNode) => {
    parentNode.appendChild(element);
}

//show or hide element
var showHideElement = (show, element) => {
    if (show) {
        element.hidden = false;
    } else {
        element.hidden = true;
    }
}

//check job title value for "Other" and show/hide input
selectTitle.addEventListener("change", (event) => {
    if (event.target.value == "other") {
        showHideElement(true, document.querySelector('#other-title'));
    } else {
        showHideElement(false, document.querySelector('#other-title'));
    }
});

//function to create "Color" default
var createColorDefault = () => {
    //set "Color" field to "Please select a T-shirt theme" by default
    var colorDefault = createElement('option');
    colorDefault.textContent = "Please select a T-shirt theme";
    selectColor.prepend(colorDefault);
    //select all options once default is added
    selectColorOptions = document.querySelectorAll('#shirt-colors option');
    return selectColorOptions;
}

//function to hide "Color" options until theme selected (requirement #5)
var hideColorOptions = () => {
    selectColorOptions[0].selected = true;
    for (var i = 0; i < selectColorOptions.length; i++) {
        var optionValue = selectColorOptions[i].value;
        if (optionValue !== "Please select a T-shirt theme") {
            showHideElement(false, selectColorOptions[i]);
        }
    }
}

//function to hide color label and select menu until theme selected (extra credit, requirement #1)
var hideColorDiv = () => { 
    var selectDesignOptions = document.querySelectorAll('#design option');
    if (selectDesignOptions[0].selected) {
        showHideElement(false, shirtColors);
    } else {
        showHideElement(true, shirtColors);
    }
}

//function to show/hide "Color" options
var showColorOptions = (optStart, optA, optB, optC) => {
    selectColorOptions[optStart].selected = true;
        for (var i = 0; i < selectColorOptions.length; i++) {
            var optionValue = selectColorOptions[i].value;
            if (optionValue == optA || optionValue == optB || optionValue == optC) {
                showHideElement(true, selectColorOptions[i]);
            } else {
                showHideElement(false, selectColorOptions[i]);
            }
        }
}

//function to hide Select a Payment Method option
var hideSelectLabel = () => {
    for (var i = 0; i < paymentOptions.length; i++) {
        if (paymentOptions[i].value === 'select method') {
            paymentOptions[i].disabled = true;
        }
    }
}

//function to hide PayPal and Bitcoin  options by default
var hideMethods = () => {
    showHideElement(false, document.querySelector('#paypal'));
    showHideElement(false, document.querySelector('#bitcoin'));
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

//create an element to display the total activity cost
var createActivityCost = () => {
    var costDiv = createElement('div');
    costDiv.id = "activity-cost";
    costDiv.className = "activity-cost";
    appendElement(costDiv, activities);
    var costLabel = createElement('label');
    costLabel.textContent = 'Total Cost:';
    appendElement(costLabel, costDiv);
    var costTotal = createElement('p');
    costTotal.className = 'cost-total';
    appendElement(costTotal, costDiv);
    costTotal.textContent = '$0';
}

//add activities event listener to update activities selected and activities cost
activities.addEventListener("change", (event) => {
    //store information for input(s) selected
    var selected = event.target;
    var selectedDate = event.target.getAttribute('data-day-and-time');
    //loop through activities, enable/disable conflicting activities, collect activity cost and add to total
    var total = 0;
    for (var i = 0; i < activityCheckboxes.length; i++) {
        var activityDate = activityCheckboxes[i].getAttribute('data-day-and-time');
        var activityCost = parseInt(activityCheckboxes[i].getAttribute('data-cost'));
        if (selectedDate === activityDate && selected !== activityCheckboxes[i]) {
            if (selected.checked) {
                activityCheckboxes[i].disabled = true;
            } else {
                activityCheckboxes[i].disabled = false;
            }
        }
        if (activityCheckboxes[i].checked) {
            total += activityCost;
        }
    }
    document.querySelector('.cost-total').textContent = '$' + total.toString();
});

//add event listener to display/hide payment input based on payment option selected
payment.addEventListener("change", (event) => {
    var selected = event.target.value;
    if (selected === 'credit card') {
        showHideElement(true, document.querySelector('#credit-card'));
        hideSelectLabel();       
    } else {
        showHideElement(false, document.querySelector('#credit-card'));
    }
    if (selected === 'paypal') {
        showHideElement(true, document.querySelector('#paypal'));
        hideSelectLabel();
    } else {
        showHideElement(false, document.querySelector('#paypal'));
    }
    if (selected === 'bitcoin') {
        showHideElement(true, document.querySelector('#bitcoin'));
        hideSelectLabel();
    } else {
        showHideElement(false, document.querySelector('#bitcoin'));
    }
});

//function to display helpful error messages
var displayError = (sibling, text, placement, className) => {
    var message = createElement('p');
    message.textContent = text;
    message.className = "error-message";
    if (className) {
        message.className = className;
    }
    sibling.insertAdjacentElement(placement, message);
}

//function to remove error message
var removeError = (elementSelector) => {
    if (document.querySelector(elementSelector)) {
        document.querySelector(elementSelector).remove();
    }
}

//function to validate name
var isValidName = () => {
    removeError('.error-message.name');
    inputName.classList.remove('invalid');
    var nameValue = inputName.value;
    if (nameValue.length > 0) {
        return true;
    } else {
        inputName.className = 'invalid';
        displayError(inputName, 'Please enter your name.', 'afterend', 'error-message name');
        return false;
    }
}

//function to validate email (could have also tested regex /^[^@]+@[^@]+\.[^@]+$/)
var isValidEmail = () => {
    removeError('.error-message.email');
    inputEmail.classList.remove('invalid');
    var emailValue = inputEmail.value;
    var indexOfAt = emailValue.indexOf('@');
    var lastIndexOfDot = emailValue.lastIndexOf('.');
    //used similar pattern from warm up example below
    //plus conditional validation logic for empty vs. invalid
    if (indexOfAt >= 1 && lastIndexOfDot > indexOfAt + 1 && /[^\.]+$/.test(emailValue)) {
        return true
    } else if (emailValue === ""){
        inputEmail.className = 'invalid';
        displayError(inputEmail, 'Please enter an email address.', 'afterend', 'error-message email')
        return false;
    } else {
        inputEmail.className = 'invalid';
        displayError(inputEmail, 'Please enter a valid email address (e.g. name@email.com).', 'afterend', 'error-message email')
        return false;
    }
}

var isValidOtherTitle = () => {
    removeError('.error-message.other-title');
    inputOtherTitle.classList.remove('invalid');
    var otherTitleValue = inputOtherTitle.value;
    if (/^[a-zA-Z]+/.test(otherTitleValue)) {
        return true;
    } else {
        inputOtherTitle.className = 'invalid';
        displayError(inputOtherTitle, 'Please enter your title.', 'afterend', 'error-message other-title');
        return false;
    }
}

//function to validate activity selection
var isValidActivity = () => {
    removeError('.activities .error-message');
    var activitiesLabels = document.querySelectorAll('fieldset.activities > label');
    for (var i = 0; i < activitiesLabels.length; i++) {
        activitiesLabels[i].classList.remove('invalid');
    }
    for (var i = 0; i < activityCheckboxes.length; i++) {
        var activityBox = activityCheckboxes[i];
        if (activityBox.checked) {
            return true;
        }
    }
    console.log(activitiesLabels);
    for (var i = 0; i < activitiesLabels.length; i++) {
        activitiesLabels[i].className = 'invalid';
    }
    var activityCost = document.querySelector('.activity-cost');
    displayError(activityCost, 'Please select at least one activity.', 'beforebegin')
    return false;
}

//function to validate credit card
var isValidCardNumber = () => {
    removeError('.error-message.cc');
    document.querySelector('#cc-num').classList.remove('invalid');
    var cardNumber = document.querySelector('#cc-num').value;
    if (/^[0-9]{13,16}$/.test(cardNumber)) {
        return true;
    } else {
        document.querySelector('#cc-num').className = 'invalid';
        displayError(creditCard, "Please enter a valid credit card number.", 'beforeend', 'error-message cc');
        return false;
    }
}

//function to validate zip code
var isValidZipCode = () => {
    removeError('.error-message.zip');
    document.querySelector('#zip').classList.remove('invalid');
    var zipCode = document.querySelector('#zip').value;
    if (/^[0-9]{5}$/.test(zipCode)) {
        return true;
    } else {
        document.querySelector('#zip').className = 'invalid';
        displayError(creditCard, "Please enter a valid zip code.", 'beforeend', 'error-message zip');
        return false;
    }
}

//function to validate CVV
var isValidCardCVV = () => {
    removeError('.error-message.cvv');
    document.querySelector('#cvv').classList.remove('invalid');
    var cvv = document.querySelector('#cvv').value;
    if (/^[0-9]{3}$/.test(cvv)) {
        return true;
    } else {
        document.querySelector('#cvv').className = 'invalid';
        displayError(creditCard, "Please enter a valid card verification value (CVV).", 'beforeend', 'error-message cvv');
        return false;
    }
}

//event listener to prevent form submission based on validation errors
document.querySelector('form').addEventListener('submit', (event) => {
    if (!isValidName()) {
        event.preventDefault();
        console.log('Name is invalid.');
    }
    if (!isValidEmail()) {
        event.preventDefault();
        console.log('Email is invalid.');
    }
    if (!isValidOtherTitle()){
        event.preventDefault();
        console.log('Other Title is invalid.')
    }
    if (!isValidActivity()) {
        event.preventDefault();
        console.log('No activities selected');
    }
    if (payment.value === 'credit card') {
        if (!isValidCardNumber()) {
            event.preventDefault();
            console.log('Card number is invalid.');
        }
        if (!isValidZipCode()) {
            event.preventDefault();
            console.log('Zip code is invalid.');
        }
        if (!isValidCardCVV()) {
            event.preventDefault();
            console.log('CVV is invalid');
        }
    }
});

//event listener to validate name as user types
inputName.addEventListener('keyup', (event) => {
    if (!isValidName()) {
        console.log('Name is invalid.');
    }
});

//event listerner to validate email as user types
inputEmail.addEventListener('keyup', (event) => {
    !isValidEmail()
});

//event listerner to validate email as user types
inputOtherTitle.addEventListener('keyup', (event) => {
    !isValidOtherTitle()
});

//event listener to validate activities on change
activities.addEventListener('change', (event) => {
    if (!isValidActivity()) {
        console.log('No activities selected.');
    }
});

//event listener to validate credit card as user types
creditCard.addEventListener('keyup', (event) => {
        if (!isValidCardNumber()) {
            console.log('Card number is invalid.');
        }
});

//event listener to validate zip code as user types
inputZipcode.addEventListener('keyup', (event) => {
    if (!isValidZipCode()) {
        console.log('Zip code is invalid.');
    }
});

//event listener to validate CVV as user types
inputCVV.addEventListener('keyup', (event) => {
    if (!isValidCardCVV()) {
        console.log('CVV is invalid');
    }
});

//event listener to hide colors when no theme is selected
selectDesign.addEventListener('change', (event) => {
    hideColorDiv();
})

showHideElement(false, document.querySelector('#other-title'));
createColorDefault();
hideColorOptions();
hideColorDiv();
createActivityCost();
hideMethods();
hideSelectLabel();