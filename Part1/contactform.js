window.onload = init;

function init() {
    setInitialFocus();
    setDefaultText("zha", "e.g. ZHA123456");
    setDefaultText("phone", "Only 11 digits allowed");
    toolTip();
    formErrorsCheck();
    submitForm();
}

// this function simply set the focus on the box first name when the page is fully loaded
function setInitialFocus() {
    document.getElementById("firstname").focus();
}

/*   This function check the focus on the last name input box. Is that box is active, the placeholder message disappears.
 *   If the user leaves the box empty, the message reappears.
 *   @param element : element to be modified
 *   @param message : message to be displayed in the placeholder*/
function setDefaultText(element, defaultMessage) {
    document.getElementById(element).setAttribute("class", "defaultText");
    document.getElementById(element).setAttribute("value", defaultMessage);
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
    validPhone();
    validZha();
}

/*function to show an error message if the input box is empty or does not meet the required length.
* @param element : element to be checked
* @param minimumLength : minimum length of the string*/

function nameErrorMessage(element, minimumLength){
    var defaultMessage = checkForDefaultText(element);      // checking for default text
    var errorMessage = "";

    // OnBlur to check whether the user input is valid. If the test fails, an appropriate message appears in the form
    document.getElementById(element).onblur = function() {
        var validName = validate(element);
        if (this.value === defaultMessage && this.value.length > 0){
            document.getElementById(element).setAttribute("class", "defaultText");
        }
        else if (this.value == ""){
            document.getElementById(element).setAttribute("class", "defaultText");
            errorMessage = "Mandatory field, cannot be left empty";
            this.value = defaultMessage;
        }
        else if (this.value.length < minimumLength) {
            errorMessage = "Minimum length " + minimumLength + " characters";
        }
        else if (!validName) {
            errorMessage = "Invalid field. Some characters are not allowed";
        } else {
            document.getElementById(element).setAttribute("class", "normalText");
            errorMessage = "";
        }
        var elementTarget = document.getElementById('field_'+element).getElementsByClassName("errorMessage")[0];
        elementTarget.innerHTML = errorMessage;
    };

    // OnFocus to clear error messages and default value if present.
    document.getElementById(element).onfocus = function () {
        var elementTarget = document.getElementById('field_'+element).getElementsByClassName("errorMessage")[0];
        elementTarget.innerHTML = "";
        if (this.value === defaultMessage) {
            document.getElementById(element).setAttribute("class", "normalText");
            this.value = "";
        }
    }
}

// Function to return the value from the drop-down menu
function validTitle(){
    var title = document.getElementById("title").value;
    return title != -1;
}

/* Function to check whether a default text is set and check the validity of the user input*/
function validZha() {
    var element = "zha";
    var defaultMessage = checkForDefaultText(element);

    // OnFocus: to clear error messages and default text (if entered)
    document.getElementById(element).onfocus = function () {
        var elementZha = document.getElementById("field_"+element).getElementsByClassName("errorMessage")[0];
        elementZha.innerHTML = "";
        if (this.value === defaultMessage) {
            document.getElementById(element).setAttribute("class", "normalText");
            this.value = "";
        }
    };

    // OnBlur: check whether the ZHA number is correct. If not, an appropriate error message appears
    document.getElementById(element).onblur = function () {
        var validZha = validate(element);
        var errorMessage = "";

        if (this.value === defaultMessage) {
            document.getElementById(element).setAttribute("class", "defaultText");
        }
        else if (this.value === "") {
            document.getElementById(element).setAttribute("class", "defaultText");
            this.value = defaultMessage;
        }
        if (!validZha) {
            errorMessage = "Invalid number. It starts with \'ZHA\' followed by 6 numbers";
        }
        var elementZha = document.getElementById("field_"+element).getElementsByClassName("errorMessage")[0];
        elementZha.innerHTML = errorMessage;
    };
}

// Function to check whether a default text is set and check the validity of the user input
function validEmail() {
    var element = "email";
    var defaultMessage = checkForDefaultText(element);

    // OnBlur: check whether the email address is correct. If not, an appropriate error message appears
    document.getElementById(element).onblur = function () {
        var errorMessage = "";
        var validEmail = validate(element);

        if (this.value === defaultMessage && this.value > 0) {
            document.getElementById(element).setAttribute("class", "defaultText");
        }
        else if (this.value == "") {
            document.getElementById(element).setAttribute("class", "defaultText");
            this.value = defaultMessage;
            errorMessage = "Mandatory field, cannot be left empty";
        }
        else if (!validEmail) {
            errorMessage = "Email is incorrect";
        }
        var elementTarget = document.getElementById('field_email').getElementsByClassName("errorMessage")[0];
        elementTarget.innerHTML = errorMessage;
    };

    // OnFocus: to clear error messages and default text (if entered)
    document.getElementById(element).onfocus = function () {
        var elementTarget = document.getElementById('field_email').getElementsByClassName("errorMessage")[0];
        elementTarget.innerHTML = "";
        if (this.value === defaultMessage) {
            document.getElementById(element).setAttribute("class", "normalText");
            this.value = "";
        }
    };
}

/* This function checks whether the phone number is valid.
* This field is not mandatory. Either an empty value or a correct 11 digits number is valid.*/
function validPhone() {
    var element = "phone";
    var defaultMessage = checkForDefaultText(element);

    // OnBlur: check whether the phone number is correct. If not, an appropriate error message appears
    document.getElementById(element).onblur = function () {
        var errorMessage = "";
        var validPhone = validate(element);

        if (this.value === defaultMessage) {
            document.getElementById(element).setAttribute("class", "defaultText");
        }
        else if (this.value === "") {
            document.getElementById(element).setAttribute("class", "defaultText");
            this.value = defaultMessage;
        }
        else if (!validPhone) {
            errorMessage = "Invalid number";
        }
        else if (this.value == ""){
            errorMessage = "";
        }
        var elementPhone = document.getElementById("field_phone").getElementsByClassName("errorMessage")[0];
        elementPhone.innerHTML = errorMessage;
    };

    // OnFocus: to clear error messages and default text (if entered)
    document.getElementById(element).onfocus = function () {
        var elementPhone = document.getElementById("field_phone").getElementsByClassName("errorMessage")[0];
        elementPhone.innerHTML = "";
        if (this.value === defaultMessage) {
            document.getElementById(element).setAttribute("class", "normalText");
            this.value = "";
        }
    };
}

/* This function tests the user input against a regular expression. If the value to be checked matches the criteria,
* a boolean "true" is returned, "false" otherwise.
* Some of the below expression are taken from stack overflow and google,
* slightly changed by myself meet the criteria of validation for my form.
* param element : element to be checked.
* return boolean : true for ok, false if not */
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
            regEx = /^\d[0-9]{10}$/;
            break;
        case "zha":
            regEx = /(^[zZ][hH][aA])[0-9]{6}$/;
            break;
        default:
            return false;
    }
    return regEx.test(id.value);
}

/* This function is triggered only if the use hits the submit button.
* It performs all data validation. Once a field is checked, a boolean value is assigned to that field.
* When all the fields are checked, all their values are pushed into an array. This array will be then checked
* for "false" values, and when a match is found, an error message is shown in the form next to the relevant field*/
function submitForm(){
    document.getElementById("submit").onclick = function () {
        var firstname = validate("firstname");
        var lastname = validate("lastname");
        var title = validTitle();
        var validZha = validate("zha");
        var email = validate("email");
        var phone = validate("phone") || document.getElementById("phone").value === "";
        var collectionOfErrors = [firstname,
            lastname,
            title,
            validZha,
            email,
            phone];
        var collectionOfFields = ["firstname",
            "lastname",
            "title",
            "zha",
            "email",
            "phone"];

        // checking presence of errors in the array.
        for (var i = 0; i < collectionOfErrors.length; i++){
            if (!collectionOfErrors[i] && i != 2) {
                var spanMessage = document.getElementById("field_" + collectionOfFields[i]).getElementsByClassName("errorMessage")[0];
                spanMessage.innerHTML = "Please check this field";
            }
        }

        // Last step: if the array contains at least on "false" value, an error message is shown next to the submit button
        if (collectionOfErrors.includes(false)){
            document.getElementById("formOK").setAttribute("class", "errorMessage");
            document.getElementById("formOK").innerHTML = "There are errors in the form";
            return false;
        } else {        // if no "false" values in the array, a message will confirm the correct submission of the form
            document.getElementById("formOK").setAttribute("class", "okMessage");
            document.getElementById("formOK").innerHTML = "Thank you, we will be in touch."
            return false;
        }
    }
}

/* helper function to test whether a default text has been selected for the given element
  (using the function setDefaultText() )
  @param element : element to be checked
  @return string : return the value of that element */
function checkForDefaultText(element){
    var defaultMessage = "";

    if (document.getElementById(element).value != 0){
        defaultMessage = document.getElementById(element).value;
    }
    return defaultMessage;
}