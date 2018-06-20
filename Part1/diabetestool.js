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

function getSingleRadioValue(field){
    var valueOfRadio;
    var fieldName = getName(field);
    for (var i = 0; i < fieldName.length; i++){
        if (fieldName[i].checked) {
            valueOfRadio = fieldName[i].value;
            valueOfRadio = parseInt(valueOfRadio);
            console.log(valueOfRadio);
        }
    }
    return valueOfRadio;
}

function getTotalRadioValues(){
    var totalScore = getSingleRadioValue("age");
    totalScore += getSingleRadioValue("bmi");
    totalScore += getSingleRadioValue("family");
    totalScore += getSingleRadioValue("diet");
    console.log("Total score is " + totalScore);
    return totalScore;
}

window.onload = function () {
    document.getElementById("submit").onclick = function (){
        alert(getTotalRadioValues());

        return false;
    };
};