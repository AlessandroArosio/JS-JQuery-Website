// function to return an array of element with the same name
function getName(elementName) {
    return document.getElementsByName(elementName);
}

function calculateRisk(arrayOfValues) {
    var score = arrayOfValues;
    var sumScore = 0;
    var message;

    // calculating the sum of all the element in the array
    for (var i = 0; i < score.length; i++){
        sumScore += score[i];
    }

    if (sumScore > 25) {
        message = "Your results show that you currently have a HIGH risk of " +
            "developing diabetes. " + highRiskMessage(arrayOfValues) +
            ". We advise that you contact the Health Authority to " +
            "discuss your risk factors as soon as you can. Please fill in our " +
            "<a href='contactform.html'>contact form</a> and a member of the Health Authority Diabetes " +
            "Team will be in contact with you.";
    } else if (sumScore > 15) {
        message = "Your results show that you currently have a medium risk of " +
            "developing diabetes. For more information on your risk " +
            "factors, and what to do about them, please visit our diabetes " +
            "advice website at <a id='link' href='http://www.zha.org.zd'>here</a>."
    } else {
        message = "Your results show that you currently have a low risk of " +
            "developing diabetes. However, it is important that you " +
            "maintain a healthy lifestyle in terms of diet and exercise.";
    }
    return message;
}

// customised message for high risk factor
function highRiskMessage(arrayOfCheckedValues) {
    var highRiskMessage = "Your main risk factor(s) ";
    var radioButtonValues = arrayOfCheckedValues;
    var riskFactor = [];

    // creating an array of the highest risk factor(s)
    if (radioButtonValues[0] >= 10) {
        riskFactor.push("Age");
    }
    if (radioButtonValues[1] >= 10) {
        riskFactor.push("BMI");
    }
    if (radioButtonValues[2] >= 10) {
        riskFactor.push("Family");
    }
    if (radioButtonValues[3] >= 10) {
        riskFactor.push("Diet");
    }

    // depending on the length of the array, an appropriate message is generated
    switch (riskFactor.length) {
        case 1:
            highRiskMessage += "is your " + riskFactor[0];
            break;
        case 2:
            highRiskMessage += "are " + riskFactor[0] + " and your " + riskFactor[1];
            break;
        case 3:
            highRiskMessage += "are " + riskFactor[0] + ", " + riskFactor[1] + " and your " + riskFactor[2];
            break;
        case 4:
            highRiskMessage += "are " + riskFactor[0] + ", " + riskFactor[1] +
                ", " + riskFactor[2] + " and your " + riskFactor[3];
            break;
    }
    return highRiskMessage;

}

// function to show the result box with risk factor and relevant message
function showResult(riskMessage) {
    var message = riskMessage;
    document.getElementById("risk").innerHTML = message;

    var changeAttribute = document.getElementById("result");
    changeAttribute.setAttribute("class", "resultBox");
}

// Function to get a single value from a radio button
function getSingleRadioValue(field){
    var valueOfRadio;
    var fieldName = getName(field);
    for (var i = 0; i < fieldName.length; i++){
        if (fieldName[i].checked) {
            valueOfRadio = fieldName[i].value;
            valueOfRadio = parseInt(valueOfRadio);
        }
    }
    return valueOfRadio;
}

// Function to calculate the sum of all the values from radio buttons
function getTotalRadioValues(){
    var ageScore = getSingleRadioValue("age");
    var bmiScore = getSingleRadioValue("bmi");
    var familyScore = getSingleRadioValue("family");
    var dietScore = getSingleRadioValue("diet");

    var totalScore = [];
    totalScore.push(ageScore, bmiScore, familyScore, dietScore);
    return totalScore;
}

function init() {
    document.getElementById("submit").onclick = function () {
        document.getElementById("submit").disabled = true;
        var arrayOfValues = getTotalRadioValues();
        var riskMessage = calculateRisk(arrayOfValues);
        showResult(riskMessage);
        return false;
    }
}

window.onload = init;