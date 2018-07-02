$(document).ready(function () {
    setFocus();
    tooltip();
    setDefaultText("#zha", "e.g. ZHA123456");
    setDefaultText("#phone", "Only 11 digits allowed");
    checkErrors();
    submitForm();
});


// function to handle the tooltip.
// On mouse over the question mark a help message appears, when the mouse leaves, the message is hidden
function tooltip() {
    $('#qMark').bind({
        'mouseover' : function () {
            $('#ttip').attr('class', 'tooltip');
        },
        'mouseout' : function () {
            $('#ttip').attr('class', 'hidden');
        }
    });
}

// this function simply set the focus on the box first name when the page is fully loaded
function setFocus() {
    $('#firstname').focus();
}

/*   This function check the focus on the last name input box. Is that box is active, the placeholder message disappears.
 *   If the user leaves the box empty, the message reappears.
 *   @param element : element to be modified
 *   @param message : message to be displayed in the placeholder*/
function setDefaultText(element, defaultMessage) {
    $(element).attr('class', "defaultText");
    $(element).attr('value', defaultMessage);
    $(element).bind({
        'focus' : function () {
            if (this.value === defaultMessage) {
                $(element).attr('class', "normalText");
                this.value = "";
            }
        },
        'blur' : function () {
            if (this.value === defaultMessage) {
                $(element).attr('class', 'defaultText');
            } else if (this.value === "") {
                $(element).attr('class', 'defaultText');
                this.value = defaultMessage;
            }
        }
    });
}

/* function to check errors in the form
*  @param:
*  return boolean for form submission
* */
function checkErrors() {
    nameErrorsCheck("#firstname", 2);
    nameErrorsCheck("#lastname", 2);
    validEmail("#email");
    validTitle("#title");
    validZha("#zha");
    validPhone("#phone");
}

/*function to show an error message if the input box is empty or does not meet the required length.
* @param element : element to be checked
* @param minimumLength : minimum length of the string*/
function nameErrorsCheck(element, minimumLength) {
    var defaultMessage = checkForDefaultText(element);
    var errorMessage = "";
    var fieldName = "#field_" + element.substr(1);

    // OnBlur to check whether the user input is valid. If the test fails, an appropriate message appears in the form
    $(element).bind({
        'blur' : function () {
            var validName = validate(element);
            if ($(this).val() === defaultMessage && $(this).val().length > 0) {
                $(element).attr("class", "defaultText");
            } else if ($(this).val() == "") {
                $(element).attr("class", "defaultText");
                errorMessage = "Mandatory field, cannot be left empty";
                $(this).val(defaultMessage);
            } else if ($(this).val().length < minimumLength) {
                errorMessage = "Minimum length " + minimumLength + " characters";
            } else if (!validName) {
                errorMessage = "Invalid field. Some characters are not allowed";
            } else {
                $(element).attr("class", "normalText");
                errorMessage = "";
            }
            $(fieldName + ' .errorMessage').html(errorMessage);
        },
        'focus' : function () {
            $(fieldName + ' .errorMessage').html(errorMessage);
            if ($(this).val() === defaultMessage) {
                $(element).attr("class", "normalTexts");
                $(this).val("");
            }
        }
    });
}

// Function to return the value from the drop-down menu
function validTitle(element) {
    return $(element).val() != -1;
}

/* Function to check whether a default text is set and check the validity of the user input*/
function validZha(element) {
    var defaultMessage = checkForDefaultText(element);
    var fieldName = "#field_" + element.substr(1);
    var errorMessage = "";

    $(element).bind({
        'focus' : function () {
            $(fieldName + ' .errorMessage').html(errorMessage);
            if ($(this).val() === defaultMessage) {
                $(element).attr("class", "normalTexts");
                $(this).val("");
            }
        },
        'blur' : function () {
            var validZha = validate(element);
            if ($(this).val() === defaultMessage) {
                $(this).attr("class", "defaultText");
            } else if ($(this).val() === "") {
                $(this).attr("class", "defaultText");
                $(this).val(defaultMessage);
            }
            if (!validZha) {
                errorMessage = "Invalid number. It starts with \'ZHA\' followed by 6 numbers";
            } else {
                errorMessage = "";
            }
            $(fieldName + ' .errorMessage').html(errorMessage);
        }
    });
}

// Function to check whether a default text is set and check the validity of the user input
function validEmail(element) {
    var defaultMessage = checkForDefaultText($('#email'));
    var errorMessage = "";
    var fieldName = "#field_" + element.substr(1);

    $(element).bind({
        'blur' : function () {
            var validEmail = validate(element);
            if ($(this).val() === defaultMessage && $(this).val() > 0) {
                $(element).attr("class", "defaultText");
            } else if ($(this).val() == "") {
                $(element).attr("class", "defaultText");
                $(this).val(defaultMessage);
                errorMessage = "Mandatory field, cannot be left empty";
            } else if (!validEmail) {
                errorMessage = "Email is incorrect";
            }
            $(fieldName + ' .errorMessage').html(errorMessage);
        },
        'focus' : function () {
            $(fieldName + ' .errorMessage').html(errorMessage);
            if ($(this).val() === defaultMessage) {
                $(element).attr("class", "normalText");
                $(this).val("");
            }
        }
    });
}

/* This function checks whether the phone number is valid.
* This field is not mandatory. Either an empty value or a correct 11 digits number is valid.*/
function validPhone(element){
    var defaultMessage = checkForDefaultText(element);
    var fieldName = "#field_" + element.substr(1);
    var errorMessage = "";

    $(element).bind({
        'blur' : function () {
            errorMessage = "";
            var validPhone = validate(element);
            if ($(this).val() === defaultMessage) {
                $(element).attr("class", "defaultText");
            } else if ($(this).val() === "") {
                $(element).attr("class", "defaultText");
                $(this).val(defaultMessage);
                errorMessage = "";
            } else if (!validPhone) {
                errorMessage = "Invalid number";
            }else if ($(this).val() == ""){
                errorMessage = "";
            }
            $(fieldName + " .errorMessage").html(errorMessage);
        },
        'focus' : function () {
            $(fieldName + ' .errorMessage').html(errorMessage);
            if ($(this).val() === defaultMessage) {
                $(element).attr("class", "normalText");
                $(this).val("");
            }
        }
    });
}

/* This function is triggered only if the use hits the submit button.
* It performs all data validation. Once a field is checked, a boolean value is assigned to that field.
* When all the fields are checked, all their values are pushed into an array. This array will be then checked
* for "false" values, and when a match is found, an error message is shown in the form next to the relevant field*/
function submitForm(){
    $('#submit').click(function () {
        var firstname = validate("#firstname");
        var lastname = validate("#lastname");
        var title = validTitle("#title");
        var validZha = validate("#zha");
        var email = validate("#email");
        var phone = validate("#phone") || $('#phone').val() === "";
        var collectionOfErrors = [firstname,
            lastname,
            title,
            validZha,
            email,
            phone];
        var collectionOfFields = ["#field_firstname",
            "#field_lastname",
            "#field_title",
            "#field_zha",
            "#field_email",
            "#field_phone"];

        // checking presence of errors in the array.
        $.each(collectionOfErrors, function (index, value) {
            if (value !== true && index !== 2){
                $(collectionOfFields[index] + " .errorMessage").html("Please check this field");
            }
        });

        // Last step: if the array contains at least on "false" value, an error message is shown next to the submit button
        if ($.inArray(false, collectionOfErrors) !== -1){
            $("#formOK").attr("class", "errorMessage");
            $("#formOK").html("There are errors in the form.")
            return false;
        } else {
            $("#formOK").attr("class", "okMessage");
            $("#formOK").html("Thank you, we will be in touch soon.");
            return false;
        }
        event.preventDefault();
    });
}

/* This function tests the user input against a regular expression. If the value to be checked matches the criteria,
* a boolean "true" is returned, "false" otherwise.
* Some of the below expression are taken from stack overflow and google,
* slightly changed by myself meet the criteria of validation for my form.
* param element : element to be checked.
* return boolean : true for ok, false if not */
function validate(element) {
    var regEx;
    switch (element) {
        case "#firstname":
            regEx = /^([a-zA-Z]){1,}('|\s|-)?[a-zA-Z]{1,}$/;
            break;
        case "#lastname":
            regEx = /^([a-zA-Z]){1,}('|\s|-)?[a-zA-Z]{1,}$/;
            break;
        case "#email":
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,30}))$/;
            break;
        case "#phone":
            regEx = /^\d[0-9]{10}$/;
            break;
        case "#zha":
            regEx = /(^[zZ][hH][aA])[0-9]{6}$/;
            break;
        default:
            return false;
    }
    return regEx.test($(element).val());
}

/* helper function to test whether a default text has been selected for the given element
  (using the function setDefaultText() )
  @param element : element to be checked
  @return string : return the value of that element */
function checkForDefaultText(element) {
    var defaultMessage = "";

    if ($(element).value != 0) {
        defaultMessage = $(element).val();
    }
    return defaultMessage;
}