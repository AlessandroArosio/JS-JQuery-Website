// function to grab ID for a given element

function getID(elementId) {
    return document.getElementById(elementId);
}

// function to return an array of element with the same name
function getName(elementName) {
    return document.getElementsByName(elementName);
}

// function to grab all the elements
function getTagElement(elementTagName) {
    return document.getElementsByTagName(elementTagName);
}

// function to get element by class name
function getClassNames(classElements) {
    return document.getElementsByClassName(classElements);
}

function calculateRisk() {
    //TODO
}

// this function will check all the radio buttons to their first value
function activateRadioButton() {
    var ageButton = getName("age");
    ageButton[0].checked = true;

    var bmiButton = getName("bmi");
    bmiButton[0].checked = true;

    var familyButton = getName("family");
    familyButton[0].checked = true;

    var dietButton = getName("diet");
    dietButton[0].checked = true;
}

window.onload = function () {
    activateRadioButton();
}