$(document).ready(function () {
    setFocus();
    tooltip();
    setDefaultText("#email", "insert email address");
    checkErrors();

    // submitForm(errors);
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
// ******** function OK **********
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
}

// ***** function OK. tested and working
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

function submitForm(errors){
    if (errors){
        $('#submit').submit(function () {
            event.preventDefault();
            // show an error message at this point close to submit button
        });
    } else {
        // show a message of successful submission.
    }
}

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

function checkForDefaultText(element) {
    var defaultMessage = "";

    if ($(element).value != 0) {
        defaultMessage = $(element).val();
    }
    return defaultMessage;
}