window.onload = init;

function init() {
    setInitialFocus();
    focusBlurDefaultText("zha", "ZHA123456");
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
function focusBlurDefaultText(element, defaultMessage) {
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

function validTitle(){
    var title = document.getElementById("title").value;

    switch (title) {
        // to do in case the return -1 doesn't work
            // by value it takes the lowercase one
    }
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

function validPhone() {
    var element = "phone";
    var defaultMessage = "11 digits only";

    document.getElementById(element).setAttribute("class", "defaultText");
    document.getElementById(element).setAttribute("value", defaultMessage);

    document.getElementById(element).onfocus = function () {
        var elementPhone = document.getElementById("field_phone").getElementsByClassName("errorMessage")[0];
        elementPhone.innerHTML = "";
        if (this.value === defaultMessage) {
            document.getElementById(element).setAttribute("class", "normalText");
            this.value = "";
        }
    };

    document.getElementById(element).onblur = function () {
        var phoneNumber = document.getElementById("phone").value;
        var errorMessage = "";
        var validPhone = validate(element);

        if (this.value === defaultMessage) {
            document.getElementById(element).setAttribute("class", "defaultText");
        }
        else if (this.value === "") {
            document.getElementById(element).setAttribute("class", "defaultText");
            this.value = defaultMessage;
        }


        if (!phoneNumber == "" || !validPhone) {
            errorMessage = "Invalid number";
        }
        var elementPhone = document.getElementById("field_phone").getElementsByClassName("errorMessage")[0];
        elementPhone.innerHTML = errorMessage;
    };
}

function validZha() {
    var element = "zha";
    var defaultMessage = "ZHA123456";
    document.getElementById(element).setAttribute("class", "defaultText");
    document.getElementById(element).setAttribute("value", defaultMessage);

    document.getElementById(element).onfocus = function () {
        var elementZha = document.getElementById("field_"+element).getElementsByClassName("errorMessage")[0];
        elementZha.innerHTML = "";
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

        var validZha = validate(element);
        var errorMessage = "";
        if (!validZha) {
            errorMessage = "Invalid number. It starts with \'ZHA\' followed by 6 numbers";
        }
        var elementZha = document.getElementById("field_"+element).getElementsByClassName("errorMessage")[0];
        elementZha.innerHTML = errorMessage;
    };
}

function submitForm(){
    document.getElementById("submit").onclick = function () {
        var firstname = validate("firstname");
        var lastname = validate("lastname");
        var title = validTitle();
        var validZha = validate("zha");
        var email = validate("email");
        var phone = validate("phone") || document.getElementById("phone").value === 0;
        var collectionOfErrors = [firstname,
                lastname,
                title,
                validZha,   // if default text is there, it returns true;
                email,
                phone       // if default text is there, it returns true;
            ];
        console.log(collectionOfErrors.toString());
        if (collectionOfErrors.includes(false)){
            alert("error in the form\n" +
                collectionOfErrors.toString());
        }
        return false;
    }
}

// function to show an error message if the input box is empty or does not meet the required length.
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
            regEx = /^\d[0-9]{10}$/;
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