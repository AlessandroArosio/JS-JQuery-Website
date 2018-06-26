window.onload = init;

function init() {
    setInitialFocus();
    textHint("zha", "ZHA123456");
    textHint("phone", "11 digits only");
    toolTip();
    // checkErrorMessage("firstname", 2);
    // checkErrorMessage('lastname', 2);
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

// function to show an error message if the input box is empty or does not meet the required length.
/*

 */
function checkErrorMessage(element, length){
    document.getElementById(element).onblur = function() {
        var elementValue = document.getElementById(element).value;
        var errorMessage = "";

        if (elementValue == ""){
            errorMessage = "Mandatory field, cannot be left empty";
        }
        else if (elementValue.length < length) {
            errorMessage = "The name is too short. Minimum length 2 characters";
        }
        document.getElementById("errorMessage").innerHTML = errorMessage
    };
    document.getElementById(element).onfocus = function () {
        document.getElementById('errorMessage').innerHTML = "";
    }
}