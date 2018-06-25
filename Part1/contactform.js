window.onload = init;

function init() {
    setInitialFocus();
    addPlaceholder("lastname", "e.g. Arosio");
    checkFocus();
    toolTip();
}

// this function simply set the focus on the box first name when the page is fully loaded
function setInitialFocus() {
    document.getElementById("firstname").focus();
}

/* function to create a placeholder with a message.
   @param element : element to be modified
   @param message : message to be displayed in the placeholder
   */
function addPlaceholder(element, message) {
    document.getElementById(element).setAttribute("placeholder", message);
}

// this function check the focus on the last name input box. Is that box is active, the placeholder message disappears.
// If the user leaves the box empty, the message reappears.
function checkFocus() {
    document.getElementById("lastname").onfocus = function () {
        this.setAttribute("placeholder", "");
    };
    document.getElementById("lastname").onblur = function () {
        this.setAttribute("placeholder", "e.g. Arosio");
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