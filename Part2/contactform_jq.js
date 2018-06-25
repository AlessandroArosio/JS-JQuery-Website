$(document).ready(function () {
    var errors;

    setFocus();
    tooltip();
    setPlaceholder("#zha", "ZHA123456");
    checkFocus();
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
function setPlaceholder(element, message) {
    $(element).attr('placeholder', message);
}

// combined function that makes a placeholder message appear/disappear depending on the input box,
// whether it is active or not. If the user does not type anything and clicks on another box,
// the placeholder message is restored.
function checkFocus() {
    $('#zha').bind({
        'focus' : function () {
            $('#zha').attr('placeholder', "")
        },
        'blur' : function () {
            $('#zha').attr('placeholder', 'ZHA123456');
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