$(document).ready(function () {
    var errors;

    setFocus();
    tooltip();
    textHint("#zha", "ZHA123456");
    // validateData() ???
    errors = checkErrors();
    submitForm(errors);
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

// function to set the auto focus on the first name when the page is loaded
function setFocus() {
    $('#firstname').focus();
}

// function to set one placeholder
function textHint(element, defaultText) {
    $(element).attr('class', "defaultText");
    $(element).attr('value', defaultText);
    setDefaultText(element, defaultText);
}

// combined function that makes a placeholder message appear/disappear depending on the input box,
// whether it is active or not. If the user does not type anything and clicks on another box,
// the placeholder message is restored.
function setDefaultText(element, defaultMessage) {
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
    // stub method
    return false;
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