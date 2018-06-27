window.onload = init;

function init() {
    setInitialFocus();
    textHint("zha", "ZHA123456");
    textHint("phone", "11 digits only");
    toolTip();
    formErrorsCheck();
}

// this function simply set the focus on the box first name when the page is fully loaded
function setInitialFocus() {
    document.getElementById("firstname").focus();
}

/* function to create a placeholder with a message.
   @param element : element to be modified
   @param message : message to be displayed in the placeholder
   */
function textHint(element, defaultText) {
    document.getElementById(element).setAttribute("class", "defaultText");
    document.getElementById(element).setAttribute("value", defaultText);
    setDefaultText(element, defaultText);
}

// this function check the focus on the last name input box. Is that box is active, the placeholder message disappears.
// If the user leaves the box empty, the message reappears.
function setDefaultText(element, defaultMessage) {
    document.getElementById(element).onfocus = function () {
        if (this.value === defaultMessage) {
            document.getElementById(element).setAttribute("class", "normalText");
            this.value = "";
        }
    };
    document.getElementById(element).onblur = function () {
        if (this.value === defaultMessage) {
            document.getElementById(element).setAttribute("class", "defaultText");
        }
        else if (this.value === "") {
            document.getElementById(element).setAttribute("class", "defaultText");
            this.value = defaultMessage;
        }
    };
}

// function to show the tooltip when the mouse is hovering the question mark.
// When the mouse leaves the area, the tooltip disappears
function toolTip() {
    var tooltip = document.getElementById("ttip");
    document.getElementById("qMark").onmouseover = function () {
        tooltip.setAttribute("class", "tooltip");
    };
    document.getElementById("qMark").onmouseout = function () {
        tooltip.setAttribute("class", "hidden");
    };
}

function formErrorsCheck() {
    nameErrorMessage('firstname', 2);
    nameErrorMessage('lastname', 2);
    validEmail();
    validTitle();
}

function validTitle(){
    var title = document.getElementById("title").value;

    return title != -1;
}

function validEmail() {
    document.getElementById('email').onblur = function () {
        var elementValue = document.getElementById('email').value;
        var errorMessage = "";
        var validEmail = validate("email");

        if (elementValue == "") {
            errorMessage = "Mandatory field, cannot be left empty";
        }
        else if (!validEmail) {
            errorMessage = "Email is incorrect";
        }
        var elementTarget = document.getElementById('field_email').getElementsByClassName("errorMessage")[0];
        elementTarget.innerHTML = errorMessage;
    };
    document.getElementById('email').onfocus = function () {
        var elementTarget = document.getElementById('field_email').getElementsByClassName("errorMessage")[0];
        elementTarget.innerHTML = "";
    };
}

// function to show an error message if the input box is empty or does not meet the required length.
/*

 */
function nameErrorMessage(element, length){
    document.getElementById(element).onblur = function() {
        var elementValue = document.getElementById(element).value;
        var errorMessage = "";
        var validInput = validate(element);

        if (elementValue == ""){
            errorMessage = "Mandatory field, cannot be left empty";
        }
        else if (elementValue.length < length) {
            errorMessage = "Minimum length " + length + " characters";
        }
        else if (!validInput) {
            errorMessage = "Invalid field. Some characters are not allowed";
        }
        var elementTarget = document.getElementById('field_'+element).getElementsByClassName("errorMessage")[0];
        elementTarget.innerHTML = errorMessage;
    };
    document.getElementById(element).onfocus = function () {
        var elementTarget = document.getElementById('field_'+element).getElementsByClassName("errorMessage")[0];
        elementTarget.innerHTML = "";
    }
}

function validate(element) {
    var regEx;
    var id = document.getElementById(element);
    switch (element) {
        case "firstname":
            regEx = /^([a-zA-Z]){1,}('|\s|-)?[a-zA-Z]{1,}$/;
            break;
        case "lastname":
            regEx = /^([a-zA-Z]){1,}('|\s|-)?[a-zA-Z]{1,}$/;
            break;
        case "email":
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,30}))$/;
            break;
        case "phone":
            regEx = /^\d[0-9]{11}$/;
            break;
        case "zha":
            regEx = /([zZ][hH][aA])[0-9]{6}$/;
            break;
        default:
            console.log("Default case in switch statement");
            return false;
    }
    return regEx.test(id.value);
}